import React from 'react';

export type ModalProps = {
  child: React.ReactElement;
  handleClose: () => void;
  isOpen: boolean;
};

const Modal = ({ isOpen, handleClose, child }: ModalProps) => {
  return (
    <>
      {isOpen && (
        <div data-testid="modal-container">
          This is the modal
          {child}
          <button data-testid="modal-close" onClick={handleClose} type="button">
            close the modal
          </button>
        </div>
      )}
    </>
  );
};

export default Modal;
