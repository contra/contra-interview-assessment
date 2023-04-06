/* eslint-disable canonical/filename-match-exported */
import { type NextPage } from 'next';
import { useState } from 'react';
import { Modal } from '@/components/modal';

const reallyLongText =
  'Text repeated over and over to showcase scroll-lock.\n'.repeat(80);

const Index: NextPage = () => {
  const [isFirstModalOpen, setIsFirstModalOpen] = useState(false);
  const [isSecondModalOpen, setIsSecondModalOpen] = useState(false);

  return (
    <div>
      <h1>Welcome to Contra!</h1>
      <button onClick={() => setIsFirstModalOpen(true)} type="button">
        Show modal
      </button>
      <div style={{ whiteSpace: 'pre-line' }}>{reallyLongText}</div>
      <Modal
        isOpen={isFirstModalOpen}
        onClose={() => setIsFirstModalOpen(false)}
      >
        <div>Hi there. I'm a modal!</div>
        <button onClick={() => setIsSecondModalOpen(true)} type="button">
          Open a nested modal
        </button>
        <Modal
          isOpen={isSecondModalOpen}
          onClose={() => setIsSecondModalOpen(false)}
        >
          <div>I'm a nested modal!</div>
        </Modal>
      </Modal>
    </div>
  );
};

export default Index;
