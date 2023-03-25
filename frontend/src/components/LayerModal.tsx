import Modal from './Modal';

type LayerModalProps = {
  handleClose: () => void;
  isOpen: boolean;
};

const LayerModal = ({ isOpen, handleClose }: LayerModalProps) => {
  return (
    <>
      {isOpen && (
        <Modal handleClose={handleClose} isOpen={isOpen}>
          <>
            <p>This is a layer modal</p>
            <button tabIndex={0} type="button" onClick={handleClose}>
              close
            </button>
          </>
        </Modal>
      )}
    </>
  );
};

export default LayerModal;
