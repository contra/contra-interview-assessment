/* eslint-disable func-style */
import { useEffect } from 'react';

export type ModalProps = {
  closeModal: () => void;
  closeModalId?: (modalName: string, isEc?: boolean) => void;
  modalContent: string;
  modalFooter?: boolean;
  modalHeader?: string;
  modalName: string;
  type?: string;
};

const Modal = ({
  closeModal,
  modalName,
  modalContent,
  closeModalId,
  type,
  modalHeader,
  modalFooter,
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
      {modalFooter ? (
        <div className="modal-footer">
          <button
            autoFocus
            className="button small"
            onClick={() => alert('callback function to submit action')}
            type="button"
          >
            Submit
          </button>
        </div>
      ) : null}
    </div>
  );
};

export { Modal };
