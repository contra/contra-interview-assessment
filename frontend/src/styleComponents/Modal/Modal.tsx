import cx from 'classnames';
import React, { useEffect } from 'react';
import { ClientOnlyPortal } from '@/utils/ClientOnlyPortal';
import { useKeyPress } from '@/utils/useKeyPress';
import ModalContent from '../ModalContent';
import styles from './Modal.module.css';

type IProps = {
  ariaLabelID?: string;
  handleModal: (content?: JSX.Element) => void;
  heading?: string;
  isOpen: boolean;
  modalContent?: JSX.Element;
};

export const Modal: React.FC<IProps> = ({
  ariaLabelID,
  handleModal,
  heading,
  isOpen,
  modalContent,
}) => {
  const escapePressed = useKeyPress('Escape');

  useEffect(() => {
    if (isOpen && escapePressed) {
      handleModal();
    }
  }, [escapePressed, handleModal, isOpen]);

  const modalClass = cx(styles['modal'], !isOpen && styles['modal-closed']);
  return (
    <ClientOnlyPortal>
      <div
        aria-labelledby={ariaLabelID}
        aria-modal="true"
        className={modalClass}
        role="dialog"
      >
        <ModalContent
          handleModal={handleModal}
          heading={heading}
          modalContent={modalContent}
        />
        <div
          className={styles['modal-overlay']}
          onClick={() => handleModal()}
          onKeyDown={() => handleModal()}
          role="button"
          tabIndex={0}
        />
      </div>
    </ClientOnlyPortal>
  );
};

export default Modal;
