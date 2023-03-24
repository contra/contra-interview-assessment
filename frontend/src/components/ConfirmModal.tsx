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
          <div className="flex justify-center flex-col items-center">
            <div className="pt-1 tb-2">
              <h3 className="text-xl font-semibold text-gray-900">
                Wait a moment
              </h3>
            </div>

            <p className="pt-1 tb-2">Are you sure you want to .....?</p>

            <div className="flex items-center p-6 space-x-2 border-gray-200 rounded-b ">
              <button
                className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                data-testid="modal-confirm-button"
                onClick={() => handleClose()}
                type="button"
              >
                Confirm
              </button>
              <button
                className="text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600"
                onClick={() => handleClose()}
                type="button"
              >
                Cancel
              </button>
            </div>
          </div>
        </Modal>
      )}
    </>
  );
};

export default ConfirmModal;
