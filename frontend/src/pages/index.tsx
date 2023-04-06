/* eslint-disable canonical/filename-match-exported */
import { type NextPage } from 'next';
import { useRef, useState } from 'react';
import { Modal } from '@/components/modal';

const reallyLongText =
  'Text repeated over and over to showcase scroll-lock.\n'.repeat(80);

const Nested = () => {
  const [isInfiniteModalOpen, setIsInfiniteModalOpen] = useState(false);

  return (
    <div>
      <div>I'm an infinitely nested modal!</div>

      <button onClick={() => setIsInfiniteModalOpen(true)} type="button">
        Just click me
      </button>

      <Modal
        isOpen={isInfiniteModalOpen}
        onClose={() => setIsInfiniteModalOpen(false)}
      >
        <button type="button">Example button</button>
        <input placeholder="Example input" type="text" />
        <input placeholder="Example input 2" type="text" />
        {isInfiniteModalOpen && <Nested />}
      </Modal>
    </div>
  );
};

const Index: NextPage = () => {
  const [isFirstModalOpen, setIsFirstModalOpen] = useState(false);

  const [isCustomModalOpen, setIsCustomModalOpen] = useState(false);
  const customContainerRef = useRef<HTMLDivElement | null>(null);

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

      <p style={{ whiteSpace: 'pre-line' }}>{reallyLongText}</p>

      <Modal
        isOpen={isFirstModalOpen}
        onClose={() => setIsFirstModalOpen(false)}
      >
        <p>Hi there. I'm the first modal. Click the button below for more.</p>
        <Nested />
      </Modal>

      <button onClick={() => setIsCustomModalOpen(true)} type="button">
        Open modal inside custom container
      </button>

      <div ref={customContainerRef}>Custom container</div>

      {customContainerRef.current && (
        <Modal
          container={customContainerRef.current}
          isOpen={isCustomModalOpen}
          onClose={() => setIsCustomModalOpen(false)}
        >
          This modal is inside a custom container. Check out the elements tree.
        </Modal>
      )}
    </div>
  );
};

export default Index;
