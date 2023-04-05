/* eslint-disable canonical/filename-match-exported */
import { type NextPage } from 'next';
import { useState } from 'react';
import { Modal } from '@/components/modal';

const Index: NextPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div>
      <h1>Welcome to Contra!</h1>
      <button onClick={() => setIsModalOpen(true)} type="button">
        Show modal
      </button>
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        Hi there. I'm a modal!
      </Modal>
    </div>
  );
};

export default Index;
