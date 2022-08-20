import FocusTrap from 'focus-trap-react';
import React, {
  forwardRef,
  useCallback,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from 'react';
import { Button } from '../Button';
import { Portal } from '../Portal';
import styles from './style.module.css';

type ModalProps = {
  children?: React.ReactNode;
  title?: string;
};

export type ModalHandles = {
  openModal: () => void;
};

export const Modal = forwardRef<ModalHandles, ModalProps>(
  ({ children, title }, ref) => {
    const [visible, setVisible] = useState(false);
    const overlayRef = useRef<HTMLDivElement>(null);

    // Removes scrolling from body
    useEffect(() => {
      if (visible) {
        document.body.style.overflow = 'hidden';
      } else {
        document.body.style.overflow = 'unset';
      }
    }, [visible]);

    const openModal = useCallback(() => {
      setVisible(true);
    }, []);

    const closeModal = useCallback(() => {
      setVisible(false);
    }, []);

    // Passing function from children to parent through ref
    useImperativeHandle(ref, () => {
      return { openModal };
    });

    // useEffect(() => {
    //   const checkIfClickedOutside = ({ target }: MouseEvent) => {
    //     if (!overlayRef.current?.contains(target as Node)) {
    //       setVisible(false);
    //     }
    //   };

    //   window.addEventListener('mousedown', checkIfClickedOutside);
    //   return () =>
    //     window.removeEventListener('mousedown', checkIfClickedOutside);
    // }, []);

    // Close modal when user press ESC button

    const close = useCallback(
      (event: KeyboardEvent) => {
        if (event.key === 'Escape') {
          closeModal();
        }
      },
      [closeModal]
    );

    useEffect(() => {
      window.addEventListener('keydown', close);
      return () => window.removeEventListener('keydown', close);
    }, [close]);

    if (!visible) return null;
    return (
      <Portal selector="#portal">
        <div className={styles['modalOverlay']}>
          <FocusTrap>
            <div className={styles['modal']} ref={overlayRef} role="dialog">
              <div className={styles['modalHeader']}>
                <h4 className={styles['modalTitle']}>{title}</h4>
                <button
                  aria-label="close"
                  className={styles['closeButton']}
                  onClick={closeModal}
                  type="button"
                >
                  X
                </button>
              </div>
              <hr />
              {children}
              <hr />
              <div className={styles['modalFooter']}>
                <Button onClick={closeModal} text="Cancel" />
                <Button onClick={closeModal} text="Ok" />
              </div>
            </div>
          </FocusTrap>
        </div>
      </Portal>
    );
  }
);
