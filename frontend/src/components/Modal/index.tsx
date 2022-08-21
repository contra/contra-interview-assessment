import FocusTrap from 'focus-trap-react';
import React, { useRef } from 'react';
import { useEscapeKeyPressed } from '@/hooks/useEscapeKeyPressed';
import { useOutsideClick } from '@/hooks/useOutsideClick';
import { useRemoveScrollWhenModalOpen } from '@/hooks/useRemoveScrollWhenModalOpen';
import { Button } from '../Button';
import { Portal } from '../Portal';
import styles from './style.module.css';

type ModalProps = {
  children?: React.ReactNode;
  setShowModal: (argument: boolean) => void;
  showModal: boolean;
  title?: string;
};

export const Modal = ({
  children,
  showModal,
  setShowModal,
  title,
}: ModalProps) => {
  const overlayRef = useRef<HTMLDivElement>(null);

  const closeModal = () => {
    setShowModal(false);
  };

  useRemoveScrollWhenModalOpen(showModal);
  useEscapeKeyPressed(closeModal);
  useOutsideClick(closeModal, overlayRef);

  if (!showModal) return null;
  return (
    <Portal selector="#portal">
      <div className={styles['modalOverlay']} ref={overlayRef}>
        <FocusTrap>
          <div
            aria-hidden={!showModal}
            aria-modal="true"
            className={styles['modal']}
            role="dialog"
            tabIndex={-1}
          >
            <div className={styles['modalHeader']}>
              <h4 className={styles['modalTitle']}>{title}</h4>
              <button
                aria-label="close"
                className={styles['closeButton']}
                data-dismiss="modal"
                onClick={closeModal}
                title="Close modal"
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
};
