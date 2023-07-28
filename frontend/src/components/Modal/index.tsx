import React, {useEffect, useRef, useCallback, ReactNode} from 'react';
// import styles from './Modal.module.css';

type ModalProps = {
  children: ReactNode;
  closeText: ReactNode | string;
  isOpen: boolean;
  onClose: () => void;
}

const modalStack: Set<HTMLDialogElement> = new Set();

export const Modal: React.FC<ModalProps> = (props: ModalProps) => {
  const modalRef = useRef<HTMLDialogElement>(null);
  const formDialogRef = useRef<HTMLFormElement>(null);
  const {isOpen, onClose, closeText, children} = props;

  // Handle tab key press
  const handleTabKey = useCallback((event: KeyboardEvent) => {
    console.log('handleTabKey');
    if (event.key === 'Tab') {
      event.preventDefault();
    }
  }, []);

  useEffect(() => {
    if (isOpen) {
      // The next line only makes sense for development environment, due to React re-render.
      if (!modalRef.current?.open) {
        modalRef.current?.showModal();
        modalStack.add(modalRef.current as HTMLDialogElement);
      }
      document.addEventListener('keydown', handleTabKey);
      document.body.style.overflow = 'hidden';
    } else {
      if (modalRef.current?.open) {
        modalRef.current.close();
        modalStack.delete(modalRef.current as HTMLDialogElement);
      }
      document.removeEventListener('keydown', handleTabKey);
      document.body.style.overflow = '';
    }

    return () => {
      document.removeEventListener('keydown', handleTabKey);
      document.body.style.overflow = '';
    };
  }, [isOpen, handleTabKey]);

  // Close modal when clicking outside of it
  const handleOutsideClick = useCallback(
    (event: MouseEvent) => {
      // eslint-disable-next-line eqeqeq
      const modalStackArray = [...modalStack];
      console.log(formDialogRef.current?.contains(event.target as Node));
      if (
        modalStackArray.pop() === modalRef.current &&
        !formDialogRef.current?.contains(event.target as Node)
      ) {
        // Calls the user of this component passed event handler.
        onClose();
        modalStack.delete(modalRef.current as HTMLDialogElement);
        modalRef.current.close();
      }
    },
      [onClose]
  );

  // Close modal
  const handleClose = useCallback(
    () => {
      if (modalRef.current) {
        // Calls the user of this component passed event handler.
        onClose();
        modalStack.delete(modalRef.current as HTMLDialogElement);
        modalRef.current.close();
      }
    },
    [onClose]
  );

  const cleanup = () => {
    document.removeEventListener('keydown', handleTabKey);
    document.removeEventListener('mousedown', handleOutsideClick);
  }

  useEffect(() => {
    if (isOpen) {
      console.debug('adding event listener');
      document.addEventListener('mousedown', handleOutsideClick);
    }

    return () => {
      console.debug('removing event listener');
      cleanup();
    };
  }, [isOpen, handleOutsideClick]);

  if (!isOpen) return null;

  return (
    <dialog ref={modalRef} style={{ padding: "0" }}>
      <form method="dialog" ref={formDialogRef}>
        <button onClick={handleClose} type="button">
          {closeText}
        </button>
        {children}
      </form>
    </dialog>
  );
};

