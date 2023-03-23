import Modal from './Modal';

type ConfirmationModalProps = {
  handleClose: () => void;
  isOpen: boolean;
};

const ConfirmModal = ({ isOpen, handleClose }: ConfirmationModalProps) => {
  return (
    <>
      {isOpen && (
        <Modal handleClose={() => handleClose()} isOpen={isOpen}>
          <>
            <p>Are you sure you want to .....?</p>

            <button onClick={() => handleClose()} type="button">
              Confirm
            </button>
            <button onClick={() => handleClose()} type="button">
              Cancel
            </button>
          </>
        </Modal>
      )}
    </>
  );
};

export default ConfirmModal;
