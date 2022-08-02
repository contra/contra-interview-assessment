import React, { useEffect, useRef, useState, useImperativeHandle } from 'react';
import { FiXCircle } from 'react-icons/fi';
import PropTypes from 'prop-types';

import ReactPortal from '@/shared/ReactPortal/ReactPortal';

import styles from './Modal.module.scss';

interface ModalProps {
  title: string;
  children: React.ReactNode;
  width?: number;
  hasHeader?: boolean;
  onClose?: () => void;
  isCloseDisabled?: boolean;
  dismissOnFocusLost?: boolean;
  height?: number;
  ref?: React.ForwardedRef<unknown>;
}

export interface ModalRef {
  openModal: () => void;
  closeModal: () => void;
}

const Modal = React.forwardRef<ModalRef, ModalProps>(
  (
    {
      title,
      children,
      width,
      hasHeader = true,
      onClose,
      isCloseDisabled,
      height,
    }: // dismissOnFocusLost = true,
    ModalProps,
    ref
  ) => {
    const modalRef = useRef<HTMLDivElement>(null);
    const [isOpen, setIsOpen] = useState(false);

    const handleClose = () => {
      onClose && onClose();
    };

    // const handleClickOutside = (e: MouseEvent) => {
    //   if (modalRef.current && modalRef.current.contains(e.target as Node)) {
    //     return;
    //   }

    //   if (dismissOnFocusLost) {
    //     onClose && onClose();
    //   }
    // };

    useImperativeHandle(ref, () => {
      return {
        openModal: () => setIsOpen(true),
        closeModal: () => setIsOpen(false),
      };
    });

    const handleEscapeKey = (e: KeyboardEvent) =>
      e.key === 'Escape' ? onClose && onClose() : null;

    const handleTabKey = (e: KeyboardEvent) => {
      const focusableModalElements =
        modalRef.current &&
        modalRef.current.querySelectorAll(
          'a[href], button, textarea, input[type="text"], input[type="radio"], input[type="checkbox"], select'
        );
      console.log(
        modalRef.current &&
          modalRef.current.querySelectorAll(
            'a[href], button, textarea, input[type="text"], input[type="radio"], input[type="checkbox"], select'
          )
      );

      if (focusableModalElements && focusableModalElements.length > 0) {
        const firstElement = focusableModalElements[0] as HTMLElement;
        const lastElement = focusableModalElements[
          focusableModalElements.length - 1
        ] as HTMLElement;
        console.log(e, document.activeElement);

        if (!e.shiftKey && document.activeElement !== firstElement) {
          firstElement?.focus();
          return e.preventDefault();
        }

        if (e.shiftKey && document.activeElement !== lastElement) {
          lastElement?.focus();
          e.preventDefault();
        }
      }
    };

    const eventListenersMap = new Map([
      ['Escape', handleEscapeKey],
      ['Tab', handleTabKey],
    ]);

    useEffect(() => {
      const keyListener = (e: KeyboardEvent) => {
        const listener = eventListenersMap.get(e.key);
        return listener && listener(e);
      };

      // document.body.addEventListener('mousedown', handleClickOutside);
      document.body.addEventListener('keydown', keyListener);
      document.body.style.overflow = 'hidden';

      return () => {
        document.body.removeEventListener('keydown', keyListener);
        document.body.style.overflow = 'unset';
        // document.body.removeEventListener('mousedown', handleClickOutside);
      };
    }, []);

    if (!isOpen) return null;

    return (
      <ReactPortal wrapperId="react-portal-modal-container">
        <div
          className={styles['modalContainer']}
          role="dialog"
          aria-modal="true"
        >
          <div
            className={styles['modal']}
            style={{ width: width, height: height }}
            ref={modalRef}
          >
            {hasHeader && (
              <div className={styles['modalHeader']}>
                <div className={styles['modalTitle']}>
                  <h3>{title}</h3>
                </div>
                <button
                  type="button"
                  className={styles['closeButton']}
                  title="Close modal"
                >
                  {!isCloseDisabled && (
                    <FiXCircle
                      className="icon actionIcon"
                      onClick={handleClose}
                    />
                  )}
                </button>
              </div>
            )}
            <div className={styles['modalBody']}>{children}</div>
            <div className={styles['modalFooter']}>
              <button type="button" title="Close modal" onClick={handleClose}>
                Cancel
              </button>
            </div>
          </div>
        </div>
      </ReactPortal>
    );
  }
);

export default Modal;

Modal.propTypes = {
  title: PropTypes.string.isRequired,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
  width: PropTypes.number,
  hasHeader: PropTypes.bool,
  onClose: PropTypes.func,
  isCloseDisabled: PropTypes.bool,
  dismissOnFocusLost: PropTypes.bool,
};
