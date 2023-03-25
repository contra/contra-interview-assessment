/* eslint-disable canonical/filename-match-exported */
import { type NextPage } from 'next';
import { useState } from 'react';
import ConfirmModal from '../components/ConfirmModal';
import { useFocusTrap } from '@/utils/hooks.util';

const Index: NextPage = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [triggerElement, setTriggerElement] = useState<
    (EventTarget & HTMLButtonElement) | null
  >(null);

  const refOuter = useFocusTrap();

  const handleOpenModal = (event: React.MouseEvent<HTMLButtonElement>) => {
    setIsOpen(true);
    setTriggerElement(event.currentTarget);
  };

  const handleClose = () => {
    setIsOpen(false);
    triggerElement?.focus();
  };

  return (
    <div
      className="flex max-w-6xl mx-auto flex-col items-center justify-center py-2 min-h-screen text-center"
      ref={refOuter}
    >
      <h1 className="text-5xl font-extrabold">Welcome to Contra!</h1>
      <button
        className="text-white bg-gradient-to-r from-purple-600 to-blue-500 hover:bg-gradient-to-l focus:ring-4 focus:outline-none focus:ring-purple-200 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mt-5 mb-2"
        onClick={handleOpenModal}
        tabIndex={0}
        type="button"
      >
        click to open the modal
      </button>
      <button tabIndex={0} type="button">
        fake button
      </button>
      {isOpen && <ConfirmModal handleClose={handleClose} isOpen={isOpen} />}
    </div>
  );
};

export default Index;
