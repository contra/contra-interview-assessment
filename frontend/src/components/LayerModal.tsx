import Modal from './Modal';

type LayerModalProps = {
  handleClose: () => void;
  isOpen: boolean;
};

const LayerModal = ({ handleClose, isOpen }: LayerModalProps) => {
  return (
    <>
      {isOpen && (
        <Modal handleClose={handleClose} isOpen={isOpen} name="Layer">
          <>
            <p>This is a layer modal</p>
            <button onClick={handleClose} tabIndex={0} type="button">
              close
            </button>
          </>
        </Modal>
      )}
    </>
  );
};

export default LayerModal;
