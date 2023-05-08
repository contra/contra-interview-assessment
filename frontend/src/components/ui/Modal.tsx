import { useContext, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { useStore } from 'zustand';
import { ModalContext } from '@/components/context/ModalContext';
import styles from './Modal.module.css';

export type ModalProps = React.PropsWithChildren & {
  handleClose: () => void;
};

export default function Modal({ handleClose, children }: ModalProps) {
  const store = useContext(ModalContext);
  const { addModal, removeModal } = useStore(store);

  useEffect(() => {
    addModal(handleClose);
    return () => removeModal(handleClose);
  }, [addModal, removeModal]);

  return createPortal(
    <div className={styles['modal-background']} onClick={handleClose}>
      <div className={styles['modal']} onClick={(e) => e.stopPropagation()}>
        {children}
      </div>
    </div>,
    document.body
  );
}
