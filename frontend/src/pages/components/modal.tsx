/* eslint-disable func-style */
import { useEffect } from 'react';

export type ModalProps = {
  buttonText?: string;
  closeModal: () => void;
  closeModalId?: (modalName: string, isEc?: boolean) => void;
  modalContent: string;
  modalFooter?: boolean;
  modalHeader?: string;
  modalName: string;
  submitAction?: () => void;
  type?: string;
};

const Modal = ({
  buttonText,
  closeModal,
  modalName,
  modalContent,
  closeModalId,
  type,
  modalHeader,
  modalFooter,
  submitAction,
}: ModalProps) => {
  useEffect(() => {
    function keyListener(event: KeyboardEvent) {
      if (event.keyCode === 27) {
        if (closeModalId) {
          closeModalId(modalName, true);
        } else {
          closeModal();
        }
      }
    }

    document.addEventListener('keydown', keyListener);

    return () => document.removeEventListener('keydown', keyListener);
  });

  const handleCloseModalId = () => {
    if (closeModalId) {
      closeModalId(modalName);
    } else {
      closeModal();
    }
  };

  const handleSubmit = () => {
    if (submitAction) {
      submitAction();
      handleCloseModalId();
    }
  };

  return (
    <div className="modal-window" id={modalName} role="dialog">
      <div className="modal-header">
        {modalHeader ? <h5 className="modal-title">{modalHeader}</h5> : null}
        <button
          autoFocus
          className="button small"
          onClick={handleCloseModalId}
          type="button"
        >
          x
        </button>
      </div>
      <div className="modal-content">
        {type === 'text' ? (
          <form className="modal-form">
            <textarea
              className="text-area"
              id="myTextarea"
              placeholder="Enter text here"
            />
          </form>
        ) : (
          <p>{modalContent}</p>
        )}
      </div>
      {modalFooter && submitAction && buttonText ? (
        <div className="modal-footer">
          <button
            autoFocus
            className="button small"
            onClick={handleSubmit}
            type="button"
          >
            {buttonText}
          </button>
        </div>
      ) : null}
    </div>
  );
};

export { Modal };
