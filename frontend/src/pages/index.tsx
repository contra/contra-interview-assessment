/* eslint-disable canonical/filename-match-exported */
import { type NextPage } from 'next';
import { useState } from 'react';
import { Modal } from '@/components/Modal';

const Index: NextPage = () => {
  const [modalAOpen, setModalAOpen] = useState(false);
  const [modalBOpen, setModalBOpen] = useState(false);

  return (
    <div className="p-4">
      <h1>Welcome to Contra!</h1>
      <h2>Multi-Modal Environment</h2>
      <div className="container mx-auto px-4 py-8">
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded"
          onClick={() => setModalAOpen(true)}
          type="button"
        >
          Open Modal A
        </button>

        <Modal
          id="modalA"
          isOpen={modalAOpen}
          onClose={() => setModalAOpen(false)}
        >
          <h2 className="text-lg font-bold mb-4">Modal A Content</h2>
          <p className="mb-4">This is the content inside Modal A.</p>
          <button
            className="bg-red-500 text-white px-4 py-2 rounded"
            onClick={() => setModalAOpen(false)}
            type="button"
          >
            Close Modal A
          </button>
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded"
            onClick={() => setModalBOpen(true)}
            type="button"
          >
            Open Modal B
          </button>
        </Modal>

        <Modal
          id="modalB"
          isOpen={modalBOpen}
          onClose={() => setModalBOpen(false)}
        >
          <h2 className="text-lg font-bold mb-4">Modal B Content</h2>
          <p className="mb-4">This is the content inside Modal B.</p>
          <button
            className="bg-red-500 text-white px-4 py-2 rounded"
            onClick={() => setModalBOpen(false)}
            type="button"
          >
            Close Modal B
          </button>
        </Modal>
      </div>
    </div>
  );
};

export default Index;
