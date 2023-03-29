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
          <div className="flex justify-center flex-col items-center">
            <p className="text-2lg pt-1 tb-2 mb-10">This is a layer modal</p>
            <button
              className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-lg px-5 py-2.5 text-center"
              onClick={handleClose}
              tabIndex={0}
              type="button"
            >
              close
            </button>
          </div>
        </Modal>
      )}
    </>
  );
};

export default LayerModal;
