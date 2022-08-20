/* eslint-disable canonical/filename-match-exported */
import { type NextPage } from 'next';
import { useCallback, useRef } from 'react';
import { Modal, type ModalHandles } from '@/components/Modal';
import { placeholderText } from './text';

const Index: NextPage = () => {
  const modalRef = useRef<ModalHandles>(null);

  const handleOpenModal = useCallback(() => {
    modalRef.current?.openModal();
  }, []);

  return (
    <>
      <Modal ref={modalRef} title="Simple Modal">
        <div>
          <p>{placeholderText}</p>
          <button onClick={handleOpenModal} type="button">
            Close
          </button>
        </div>
      </Modal>

      <h1>Modal Playground!</h1>
      <button onClick={handleOpenModal} type="button">
        Open Modal
      </button>

      <p>{placeholderText}</p>
      <p>{placeholderText}</p>
      <p>{placeholderText}</p>
      <p>{placeholderText}</p>
    </>
  );
};

export default Index;
