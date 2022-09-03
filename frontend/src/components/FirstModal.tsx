import { useState } from 'react';
import ReactDOM from 'react-dom';
import SecondModal from './SecondModal';

interface ModalProps {
  open: boolean;
  onClose: () => void;
}

export default function Modal({ open, onClose }: ModalProps) {
  const [openConfirmDialog, setOpenConfirmDialog] = useState(false);

  const onOpenConfirmDialog = () => {
    setOpenConfirmDialog(true);
  };

  const onCloseConfirmDialog = () => {
    setOpenConfirmDialog(false);
  };

  if (!open) return null;
  return ReactDOM.createPortal(
    <div
      className="modal"
      style={open ? { display: 'block' } : { display: 'none' }}
    >
      <div className="modal-content">
        <span className="close" onClick={onClose}>
          &times;
        </span>
        <h2>Please Enter your Details</h2>
        <div className="form-container">
          <div>
            <label>Name</label>
          </div>
          <div>
            <input type="text" />
          </div>
          <div>
            <label>Date of Birth</label>
          </div>
          <div>
            <input type="date" />
          </div>
          <div>
            <label>Email Address</label>
          </div>
          <div>
            <input type="email" />
          </div>
          <div>
            <label>Password</label>
          </div>
          <div>
            <input type="password" />
          </div>
          <div>
            <button onClick={onOpenConfirmDialog}>Submit</button>
          </div>
        </div>
      </div>
      <SecondModal
        open={openConfirmDialog}
        onCloseDialog={onCloseConfirmDialog}
        onCloseModal={onClose}
      />
    </div>,
    document.body
  );
}
