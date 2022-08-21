/* eslint-disable canonical/filename-match-exported */
import { type NextPage } from 'next';
import Head from 'next/head';
import { useState } from 'react';
import { Button } from '@/components/Button';
import { Modal } from '@/components/Modal';
import { placeholderText } from './text';

const Index: NextPage = () => {
  const [showSimpleModal, setShowSimpleModal] = useState(false);
  const [showSecondModal, setShowSecondModal] = useState(false);

  const openFirstModal = () => {
    setShowSimpleModal(true);
  };

  const openSecondModal = () => {
    setShowSecondModal(true);
  };

  return (
    <>
      <Head>
        <title>Modal Playground</title>
      </Head>
      <Modal
        setShowModal={setShowSimpleModal}
        showModal={showSimpleModal}
        title="Simple Modal"
      >
        <p>
          As you can see, the background is completely locked, no scroll
          allowed, neat.
        </p>
      </Modal>

      <Modal
        setShowModal={setShowSecondModal}
        showModal={showSecondModal}
        title="Stacked Modal"
      >
        <p>Click at the button to see a stacked Modal</p>
        <Button onClick={openFirstModal} text="Open another Modal" />
      </Modal>

      <h1>Modal Playground</h1>
      <div style={{ display: 'flex', gap: '1rem' }}>
        <Button onClick={openFirstModal} text="Open Modal" />
        <Button onClick={openSecondModal} text="Open Stacked Modal" />
      </div>

      <p>{placeholderText}</p>
      <p>{placeholderText}</p>
      <p>{placeholderText}</p>
      <p>{placeholderText}</p>
    </>
  );
};

export default Index;
