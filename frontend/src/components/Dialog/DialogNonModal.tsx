import React, {
  useEffect,
  useRef,
  useCallback,
  useState,
  type ReactNode,
  type SyntheticEvent,
} from 'react';
import closeStyle from './Close.module.css';
import styles from './Dialog.module.css';
import { modalStack } from "./DialogManager";

type ModalProps = {
  children: ReactNode;
  closeOnBackdropClick?: boolean;
  isOpen: boolean;
  onClose: (event: KeyboardEvent | SyntheticEvent) => void;
};
export const DialogNonModal: React.FC<ModalProps> = (props: ModalProps) => {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const dialogRootRef = useRef<HTMLDivElement>(null);
  const [zIndex, setZIndex] = useState<number>(0);
  const { closeOnBackdropClick = true, isOpen, onClose, children } = props;

  // Handle tab key press
  const handleTabKey = useCallback((event: KeyboardEvent) => {
    if (event.key === 'Tab') {
      if (!dialogRef.current?.contains(event.target as Node)) {
        event.preventDefault();
        event.stopPropagation();
        return;
      }

      const focusableElements = dialogRef.current.querySelectorAll<HTMLElement>(
        'a[href], button, textarea, input, select'
      );
      // Removes elements which have the tabIndex set to "-1" i.e. are not focusable and
      // sorts again by the tabIndex itself, because querySelectorAll returns the DOM order.
      const filteredElements = [
        ...(focusableElements as NodeListOf<HTMLElement>),
      ]
        .filter((domElement) => domElement.tabIndex !== -1)
        .sort((a, b) => a.tabIndex - b.tabIndex);

      if (filteredElements.length === 0) return;

      const firstFocusableElement = filteredElements.at(0);
      const lastFocusableElement = filteredElements.at(-1);

      if (event.shiftKey && document.activeElement === firstFocusableElement) {
        event.preventDefault();
        lastFocusableElement?.focus();
      } else if (
        !event.shiftKey &&
        document.activeElement === lastFocusableElement
      ) {
        event.preventDefault();
        firstFocusableElement?.focus();
      }
    }
  }, []);

  // Close modal, either by clicking on the backdrop or the "close" icon.
  const handleClose = useCallback(() => {
    dialogRootRef.current?.classList.remove(styles['dialogRootShow'] as string);

    // Calls the user of this component passed event handler.
    setTimeout(onClose, 250);
    modalStack.delete(dialogRef.current as HTMLDialogElement);
  }, [onClose]);

  useEffect(() => {
    if (isOpen) {
      modalStack.add(dialogRef.current as HTMLDialogElement);
      setZIndex(
        10_000 + [...modalStack].indexOf(dialogRef.current as HTMLDialogElement)
      );
      setTimeout(() => {
        dialogRootRef.current?.classList.add(
          styles['dialogRootShow'] as string
        );
      }, 0);
      document.addEventListener('keydown', handleTabKey);
      document.body.classList.add(styles['blockScrolling'] as string);
    } else {
      handleClose();
      document.removeEventListener('keydown', handleTabKey);
      document.body.classList.remove(styles['blockScrolling'] as string);
    }

    return () => {
      document.removeEventListener('keydown', handleTabKey);
      document.body.classList.remove(styles['blockScrolling'] as string);
    };
  }, [isOpen, handleClose, handleTabKey]);

  // Close modal when clicking outside of it
  const handleOutsideClick = useCallback(
    (event: React.MouseEvent) => {
      event.stopPropagation();

      // eslint-disable-next-line eqeqeq
      const modalStackArray = [...modalStack];
      if (
        event.target === dialogRootRef.current &&
        modalStackArray.at(-1) === dialogRef.current
      ) {
        handleClose();
      }
    },
    [handleClose]
  );

  if (!isOpen) return null;

  return (
    <div
      aria-modal
      className={styles['dialogRoot']}
      data-testid="dialog-root"
      onClick={closeOnBackdropClick ? handleOutsideClick : () => {}}
      ref={dialogRootRef}
      style={{ zIndex }}
    >
      <dialog className={styles['dialog']} open={isOpen} ref={dialogRef}>
        <a
          aria-label="close"
          className={closeStyle['close']}
          onClick={handleClose}
        >
          &times;
        </a>
        {children}
      </dialog>
    </div>
  );
};
