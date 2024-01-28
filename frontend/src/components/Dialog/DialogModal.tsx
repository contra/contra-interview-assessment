import React, {
  useEffect,
  useRef,
  useCallback,
  type ReactNode,
} from 'react';
import closeStyle from './Close.module.css';
import styles from './Dialog.module.css';
import { modalStack } from "./DialogManager";

type ModalProps = {
  children: ReactNode;
  closeOnBackdropClick?: boolean;
  isOpen: boolean;
  onClose: () => void;
};

export const DialogModal: React.FC<ModalProps> = (props: ModalProps) => {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const { closeOnBackdropClick = true, isOpen, onClose, children } = props;

  // Close modal, either by clicking on the backdrop or the "close" icon.
  const handleClose = useCallback(() => {
    dialogRef.current?.classList.add(styles['close'] as string);
    setTimeout(() => {
      if (dialogRef.current?.open) {
        dialogRef.current.close();
        dialogRef.current.classList.remove(styles['close'] as string);
      }

      onClose();
    }, 250);

    modalStack.delete(dialogRef.current as HTMLDialogElement);
  }, [onClose]);

  useEffect(() => {
    if (isOpen) {
      modalStack.add(dialogRef.current as HTMLDialogElement);
      setTimeout(() => {
        if (!dialogRef.current?.open) {
          dialogRef.current?.showModal();
        }

        document.body.classList.add(styles['blockScrolling'] as string);
      }, 250);
    } else {
      // handleClose();
      document.body.classList.remove(styles['blockScrolling'] as string);
    }

    return () => {
      document.body.classList.remove(styles['blockScrolling'] as string);
    };
  }, [isOpen]);

  // Close modal when clicking outside of it
  const handleOutsideClick = useCallback(
    (event: React.MouseEvent) => {
      event.stopPropagation();
      const rect = dialogRef.current?.getBoundingClientRect() as DOMRect;
      const isInDialog =
        rect.top <= event.clientY &&
        event.clientY <= rect.top + rect.height &&
        rect.left <= event.clientX &&
        event.clientX <= rect.left + rect.width;

      const modalStackArray = [...modalStack];
      if (
        !isInDialog &&
        closeOnBackdropClick &&
        modalStackArray.at(-1) === dialogRef.current
      ) {
        handleClose();
      }
    },
    [closeOnBackdropClick, handleClose]
  );

  if (!isOpen) return null;

  return (
    <dialog
      className={styles['dialog']}
      data-testid="dialog"
      onClick={handleOutsideClick}
      ref={dialogRef}
    >
      <a
        aria-label="close"
        className={closeStyle['close']}
        onClick={handleClose}
      >
        &times;
      </a>
      {children}
    </dialog>
  );
};
