/* eslint-disable canonical/filename-match-exported */
import ConfirmModal from '../components/ConfirmModal';
import { type NextPage } from 'next';
import { useState } from 'react';

const Index: NextPage = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [triggerElement, setTriggerElement] = useState<
    (EventTarget & HTMLButtonElement) | null
  >(null);

  const handleOpenModal = (event: React.MouseEvent<HTMLButtonElement>) => {
    setIsOpen(true);
    setTriggerElement(event.currentTarget);
  };

  const handleClose = () => {
    setIsOpen(false);
    triggerElement?.focus();
  };

  return (
    <div className="flex max-w-6xl mx-auto flex-col items-center justify-center py-2 min-h-[125vh] text-center">
      <h1 className="text-5xl font-extrabold mb-8">Welcome to Contra!</h1>
      <button
        className="focus:ring-4 focus:outline-none rounded-lg border text-lg font-medium px-5 py-2.5 focus:z-10 bg-gray-700 text-gray-300 border-gray-500 hover:text-white hover:bg-gray-600 focus:ring-gray-600"
        tabIndex={0}
        type="button"
      >
        fake button
      </button>
      <button
        className="text-white bg-gradient-to-r from-purple-600 to-blue-500 hover:bg-gradient-to-l focus:ring-4 focus:outline-none focus:ring-purple-200 font-medium rounded-lg text-xl px-5 py-2.5 text-center mr-2 mt-5 mb-5"
        data-testid="open-modal-button"
        onClick={handleOpenModal}
        tabIndex={0}
        type="button"
      >
        click to open the modal
      </button>
      <button
        className="focus:ring-4 focus:outline-none rounded-lg border text-lg font-medium px-5 py-2.5 focus:z-10 bg-gray-700 text-gray-300 border-gray-500 hover:text-white hover:bg-gray-600 focus:ring-gray-600"
        tabIndex={0}
        type="button"
      >
        fake button
      </button>
      {isOpen && <ConfirmModal handleClose={handleClose} isOpen={isOpen} />}
    </div>
  );
};

export default Index;
