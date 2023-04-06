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
      <p>
        This page has some inputs and quite a bit of text to showcase things
        such as focus traps and scroll-locking.
      </p>

      <button onClick={() => setIsFirstModalOpen(true)} type="button">
        Show modal
      </button>

      <div style={{ whiteSpace: 'pre-line' }}>{reallyLongText}</div>

      <Modal
        isOpen={isFirstModalOpen}
        onClose={() => setIsFirstModalOpen(false)}
      >
        <p>Hi there. I'm a modal!</p>

        <button onClick={() => setIsSecondModalOpen(true)} type="button">
          Open a nested modal
        </button>

        <div>
          <input placeholder="Example input" type="text" />
          <input placeholder="Example input 2" type="text" />
        </div>

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
