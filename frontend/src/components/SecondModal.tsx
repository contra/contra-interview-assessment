import ReactDOM from 'react-dom';

interface ModalProps {
  open: boolean;
  onCloseDialog: () => void;
  onCloseModal: () => void;
}

export default function SecondModal({
  open,
  onCloseDialog,
  onCloseModal,
}: ModalProps) {
  if (!open) return null;
  return ReactDOM.createPortal(
    <div
      className="modal"
      style={open ? { display: 'block' } : { display: 'none' }}
    >
      <div className="dialog-content">
        <span className="close" onClick={onCloseDialog}>
          &times;
        </span>
        <div className="">Are you sure the details are correct?</div>
        <div className="buttons-list">
          <button
            onClick={() => {
              onCloseDialog();
              onCloseModal();
            }}
          >
            Yes
          </button>
          <button
            style={{ marginLeft: 10 }}
            onClick={() => {
              onCloseDialog();
            }}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>,
    document.body
  );
}
