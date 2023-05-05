/* eslint-disable canonical/filename-match-exported */
import { type NextPage } from 'next';
import { useState } from 'react';
import { Modal } from '@/components/Modal';

const Index: NextPage = () => {
  const [modalOpen, setModalOpen] = useState(false);

  const openModal = () => setModalOpen(true);
  const closeModal = () => setModalOpen(false);

  return (
    <div className="p-4">
      <h1>Welcome to Contra!</h1>
      <div className="container mx-auto px-4 py-8">
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded"
          onClick={openModal}
          type="button"
        >
          Open Modal
        </button>

        <Modal isOpen={modalOpen} onClose={closeModal}>
          <h2 className="text-lg font-bold mb-4">Modal Content</h2>
          <p className="mb-4">This is the content inside the modal.</p>
          <button
            className="bg-red-500 text-white px-4 py-2 rounded"
            onClick={closeModal}
            type="button"
          >
            Close Modal
          </button>
        </Modal>
      </div>
    </div>
  );
};

export default Index;
