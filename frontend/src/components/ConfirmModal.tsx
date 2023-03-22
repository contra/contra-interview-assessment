import Modal from './Modal';

type ConfirmationModalProps = {
  handleClose: () => void;
  isOpen: boolean;
};

const ConfirmModal = ({ isOpen, handleClose }: ConfirmationModalProps) => {
  return (
    <>
      {isOpen && (
        <Modal
          child={
            <>
              <p>Are you sure?</p>

              <button onClick={() => handleClose()} type="button">
                Confirm
              </button>
            </>
          }
          handleClose={() => handleClose()}
          isOpen={isOpen}
        />
      )}
    </>
  );
};

export default ConfirmModal;
