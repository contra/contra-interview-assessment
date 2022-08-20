import React, {
  forwardRef,
  useCallback,
  useEffect,
  useImperativeHandle,
  useState,
} from 'react';
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

    useImperativeHandle(ref, () => {
      return { openModal };
    });

    // Apply close modal function to keyboard ESC button
    useEffect(() => {
      const close = (event: KeyboardEvent) => {
        if (event.key === 'Escape') {
          setVisible(false);
        }
      };

      window.addEventListener('keydown', close);
      return () => window.removeEventListener('keydown', close);
    }, []);

    if (!visible) return null;
    return (
      <Portal selector="#portal">
        <div className={styles['modalOverlay']}>
          <div className={styles['modal']} role="dialog">
            <div className={styles['modalHeader']}>
              <h4>{title}</h4>
              <button
                aria-label="close"
                className={styles['closeButton']}
                onClick={() => setVisible(false)}
                type="button"
              >
                X
              </button>
            </div>

            {children}
          </div>
        </div>
      </Portal>
    );
  }
);
