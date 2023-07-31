import React, { useEffect, useRef, useCallback, type ReactNode } from 'react';
import closeStyle from './Close.module.css';
import styles from './Dialog.module.css';
import { modalStack } from './DialogManager';

type ModalProps = {
  children: ReactNode;
  isOpen: boolean;
  onClose: () => void;
};

export const Dialog: React.FC<ModalProps> = (props: ModalProps) => {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const dialogRootRef = useRef<HTMLDivElement>(null);
  const { isOpen, onClose, children } = props;

  // Handle tab key press
  const handleTabKey = useCallback((event: KeyboardEvent) => {
    if (event.key === 'Tab') {
      const focusableElements =
        dialogRef.current?.querySelectorAll<HTMLElement>(
          'a[href], button, textarea, input[type="text"], input[type="radio"], input[type="checkbox"], select'
        );

      if (!focusableElements || focusableElements.length === 0) return;

      const firstFocusableElement = focusableElements[0];
      const lastFocusableElement =
        focusableElements[focusableElements.length - 1];

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

  useEffect(() => {
    if (isOpen) {
      modalStack.add(dialogRef.current as HTMLDialogElement);
      document.addEventListener('keydown', handleTabKey);
      document.body.classList.add(styles.blockScrolling);
    } else {
      modalStack.delete(dialogRef.current as HTMLDialogElement);
      document.removeEventListener('keydown', handleTabKey);
      document.body.classList.remove(styles.blockScrolling);
    }

    return () => {
      document.removeEventListener('keydown', handleTabKey);
      document.body.classList.remove(styles.blockScrolling);
    };
  }, [isOpen, handleTabKey]);

  // Close modal, either by clicking on the backdrop or the "close" icon.
  const handleClose = useCallback(() => {
    // @ts-expect-error will be refactored
    dialogRootRef.current?.classList.add(styles.dialogRootFadeOut);
    setTimeout(() => {
      // @ts-expect-error will be refactored
      dialogRootRef.current?.classList.toggle(styles.dialogRootFadeOut);
      // @ts-expect-error will be refactored
      dialogRootRef.current?.classList.add(styles.hide);
    }, 250);

    // Calls the user of this component passed event handler.
    setTimeout(onClose, 500);
    modalStack.delete(dialogRef.current as HTMLDialogElement);
  }, [onClose]);

  // Close modal when clicking outside of it
  const handleOutsideClick = useCallback(
    (event: MouseEvent) => {
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
      className={styles['dialogRoot']}
      onClick={handleOutsideClick}
      ref={dialogRootRef}
      data-testid="dialog-root"
    >
      <dialog className={styles['dialog']} open={isOpen} ref={dialogRef}>
        <a className={closeStyle['close']} onClick={handleClose}></a>
        {children}
      </dialog>
    </div>
  );
};
