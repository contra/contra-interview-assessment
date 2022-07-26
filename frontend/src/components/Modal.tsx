import FocusTrap from 'focus-trap-react';
import { useEffect } from 'react';
import Portal from '@/hoc/Portal';
import { useScrollLock } from '@/hooks/useScrollLock';
import styles from '../styles/Modal.module.scss';

export type ModalProps = {
  children?: React.ReactNode;
  close: (event: React.MouseEvent<HTMLButtonElement> | undefined) => void;
  title?: string;
  trapFocus?: boolean;
};

export type ModalState = {};

const Modal = ({ children, title, close, trapFocus = true }: ModalProps) => {
  const [lockScroll, unlockScroll] = useScrollLock();
  useEffect(() => {
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') close(undefined);
    };

    window.addEventListener('keydown', closeOnEscape);

    return () => {
      window.removeEventListener('keydown', closeOnEscape);
    };
  }, [close]);

  useEffect(() => {
    lockScroll();

    return () => {
      unlockScroll();
    };
  }, [lockScroll, unlockScroll]);

  return (
    <Portal>
      <FocusTrap active={trapFocus}>
        <div className={styles.container} role="dialog">
          <div className={styles.window}>
            <button
              aria-label="Close dialog"
              className={styles['btn-close']}
              onClick={close}
              type="button"
            >
              ❌
            </button>
            {title && (
              <div className={styles.header}>
                <h2 aria-label="Title">{title}</h2>
              </div>
            )}
            <div aria-label="Body" className={styles.body}>
              {children}
            </div>
          </div>
          <button
            aria-hidden
            className={styles.overlay}
            onClick={close}
            tabIndex={-1}
            type="button"
          />
        </div>
      </FocusTrap>
    </Portal>
  );
};

export default Modal;
