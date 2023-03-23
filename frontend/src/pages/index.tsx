/* eslint-disable canonical/filename-match-exported */
import ConfirmationModal from '../components/ConfirmModal';
import { type NextPage } from 'next';
import { useEffect, useRef, useState } from 'react';

const Index: NextPage = () => {
  const [isOpen, setIsOpen] = useState(false);
  const lastActiveElement = useRef<Element | null>(null);

  useEffect(() => {
    if (isOpen) {
      lastActiveElement.current = document.activeElement;
      if (lastActiveElement.current instanceof HTMLElement) {
        lastActiveElement.current.blur();
      }
    }
  }, [isOpen]);

  const handleClose = () => {
    setIsOpen(false);
    if (lastActiveElement.current instanceof HTMLElement) {
      lastActiveElement.current.focus();
    }
  };

  return (
    <div className="flex max-w-6xl mx-auto flex-col items-center justify-center py-2 min-h-screen text-center">
      <h1 className="text-5xl font-extrabold">Welcome to Contra!</h1>
      <button
        data-modal-target="staticModal"
        data-modal-toggle="staticModal"
        className="text-white bg-gradient-to-r from-purple-600 to-blue-500 hover:bg-gradient-to-l focus:ring-4 focus:outline-none focus:ring-purple-200 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mt-5 mb-2"
        onClick={() => setIsOpen(true)}
        type="button"
      >
        click to open the modal
      </button>
      <ConfirmationModal handleClose={handleClose} isOpen={isOpen} />
    </div>
  );
};

export default Index;
