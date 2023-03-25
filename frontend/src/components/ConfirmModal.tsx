import { useState } from 'react';
import Modal from './Modal';
import LayerModal from './LayerModal';

type ConfirmationModalProps = {
  handleClose: () => void;
  isOpen: boolean;
};

const ConfirmModal = ({ isOpen, handleClose }: ConfirmationModalProps) => {
  const [isLayerOpen, setIsLayerOpen] = useState(false);
  const [triggerElement, setTriggerElement] = useState<
    (EventTarget & HTMLButtonElement) | null
  >(null);

  const handleConfirm = (event: React.MouseEvent<HTMLButtonElement>) => {
    setIsLayerOpen(true);
    setTriggerElement(event.currentTarget);
  };

  const handleLayerClose = () => {
    setIsLayerOpen(false);
    triggerElement?.focus();
  };

  return (
    <>
      {isOpen && (
        <Modal handleClose={handleClose} isOpen={isOpen}>
          <div className="flex justify-center flex-col items-center">
            <div className="pt-1 tb-2">
              <h3 className="text-xl font-semibold text-gray-900">
                Wait a moment
              </h3>
            </div>

            <p className="pt-1 tb-2">
              Are you sure you want to open another modal?
            </p>

            <div className="flex items-center p-6 space-x-2 border-gray-200 rounded-b ">
              <button
                className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                data-testid="modal-confirm-button"
                onClick={(event) => handleConfirm(event)}
                tabIndex={0}
                type="button"
              >
                Confirm
              </button>
              <button
                className="text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600"
                onClick={handleClose}
                tabIndex={0}
                type="button"
              >
                Cancel
              </button>
            </div>

            {isLayerOpen && (
              <LayerModal isOpen={isLayerOpen} handleClose={handleLayerClose} />
            )}
          </div>
        </Modal>
      )}
    </>
  );
};

export default ConfirmModal;
