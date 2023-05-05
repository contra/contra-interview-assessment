import React, { useCallback, useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import { AiOutlineClose } from 'react-icons/ai';

/** AreYouSureModal | A lightweight modal thats just want you to be sure before you kill it. */

type ModalProps = {
  children: React.ReactNode;
  closeOverride?: () => void;
  isOpen: boolean;
  overlayDismissed?: boolean;
  setOpen: (newOpen: boolean) => void;
  size?: string;
  title?: string;
};

const AreYouSureModal = ({
  isOpen = false,
  setOpen,
  closeOverride,
  children,
  size = 'md',
  title = '',
  overlayDismissed = false,
}: ModalProps) => {
  const [modalElement, setModalElement] = useState<HTMLDivElement | null>(null);

  const close = useCallback(() => {
    document.body.classList.remove('modal-open');
    setOpen(false);
  }, [setOpen]);

  const onClose = useCallback(() => {
    if (closeOverride && typeof closeOverride === 'function') {
      closeOverride();
    } else {
      close();
    }
  }, [closeOverride, close]);

  useEffect(() => {
    if (!modalElement) {
      const element = document.createElement('div');
      setModalElement(element);
      document.body.appendChild(element);
    }

    return () => {
      if (modalElement) {
        document.body.removeChild(modalElement);
      }
    };
  }, [modalElement]);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.keyCode === 27) {
        onClose();
      } else if (event.keyCode === 9) {
        const focusableElements = modalElement?.querySelectorAll(
          'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled])'
        );
        if (
          focusableElements &&
          focusableElements.length > 0 &&
          event.target === focusableElements[focusableElements.length - 1]
        ) {
          focusableElements[0]?.focus();

          event.preventDefault();
        }
      }
    };

    if (isOpen) {
      // Background scroll-locking
      document.body.classList.add('modal-open');
      const focusableElements = modalElement?.querySelectorAll(
        'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled])'
      );
      if (focusableElements && focusableElements.length > 0) {
        focusableElements[0]?.focus();
      }

      document.addEventListener('keydown', handleKeyDown);
    }

    return () => {
      document.body.classList.remove('modal-open');
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, modalElement, onClose]);

  return isOpen
    ? ReactDOM.createPortal(
        <div>
          {overlayDismissed ? (
            <div className="modal-wrapper" onClick={onClose}>
              <div
                className={`modal-container ${size}`}
                onClick={(e) => e.stopPropagation()}
              >
                <div className="modal-header">
                  <div style={{ flexGrow: '1' }}>
                    {title && (
                      <div className="modal-header title-container">
                        <h1 className="modal-title">{title}</h1>
                      </div>
                    )}
                  </div>
                  <div>
                    <div className="btn-close-wrapper">
                      <button
                        className="btn-close"
                        onClick={onClose}
                        style={{ fontSize: '2rem' }}
                        type="submit"
                      >
                        <AiOutlineClose />
                      </button>
                    </div>
                  </div>
                </div>
                <hr className="mt-1" />
                <div className="modal-body">
                  <div onKeyDown={(e) => e.stopPropagation()}>
                    <div>{children}</div>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="modal-wrapper">
              <div
                className={`modal-container ${size}`}
                onClick={(e) => e.stopPropagation()}
              >
                <div className="modal-header">
                  <div style={{ flexGrow: '1' }}>
                    {title && (
                      <div className="modal-header title-container">
                        <h1 className="modal-title">{title}</h1>
                      </div>
                    )}
                  </div>
                  <div>
                    <div className="btn-close-wrapper">
                      <button className="btn-close" onClick={onClose}>
                        <AiOutlineClose />
                      </button>
                    </div>
                  </div>
                </div>
                <hr className="mt-1" />
                <div className="modal-body">
                  <div onKeyDown={(e) => e.stopPropagation()}>
                    <div>{children}</div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>,
        modalElement as HTMLDivElement
      )
    : null;
};

export default AreYouSureModal;
