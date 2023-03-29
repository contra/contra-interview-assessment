import { useState } from 'react';
import LayerModal from './LayerModal';
import Modal from './Modal';

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
        <Modal handleClose={handleClose} isOpen={isOpen} name="Confirm">
          <div className="flex justify-center flex-col items-center">
            <div className="pt-1 tb-2">
              <h3 className="text-xl font-semibold text-gray-900">
                Wait a moment
              </h3>
            </div>

            <p className="text-2lg pt-1 tb-2">
              Are you sure you want to open another modal?
            </p>

            <div className="flex items-center p-6 space-x-2 border-gray-200 rounded-b ">
              <button
                className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-lg px-5 py-2.5 text-center"
                data-testid="modal-confirm-button"
                onClick={(event) => handleConfirm(event)}
                tabIndex={0}
                type="button"
              >
                Confirm
              </button>
              <button
                className="focus:ring-4 focus:outline-none rounded-lg border text-lg font-medium px-5 py-2.5 focus:z-10 bg-gray-700 text-gray-300 border-gray-500 hover:text-white hover:bg-gray-600 focus:ring-gray-600"
                onClick={handleClose}
                tabIndex={0}
                type="button"
              >
                Cancel
              </button>
            </div>

            {isLayerOpen && (
              <LayerModal handleClose={handleLayerClose} isOpen={isLayerOpen} />
            )}
          </div>
        </Modal>
      )}
    </>
  );
};

export default ConfirmModal;
