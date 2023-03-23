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
    <>
      <h1>Welcome to Contra!</h1>
      <button onClick={() => setIsOpen(true)} type="button">
        click to open the modal
      </button>
      <ConfirmationModal handleClose={handleClose} isOpen={isOpen} />
    </>
  );
};

export default Index;
