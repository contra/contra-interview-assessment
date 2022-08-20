/* eslint-disable canonical/filename-match-exported */
import { type NextPage } from 'next';
import Head from 'next/head';
import { useCallback, useRef } from 'react';
import { Button } from '@/components/Button';
import { Modal, type ModalHandles } from '@/components/Modal';
import { placeholderText } from './text';

const Index: NextPage = () => {
  const modalRef = useRef<ModalHandles>(null);
  const stackedModalRef = useRef<ModalHandles>(null);

  const handleOpenModal = useCallback(() => {
    modalRef.current?.openModal();
  }, []);

  return (
    <>
      <Head>
        <title>Modal Playground</title>
      </Head>
      <Modal ref={modalRef} title="Simple Modal">
        <p>
          As you can see, the background is completely locked, no scroll
          allowed, neat.
        </p>
      </Modal>

      <Modal ref={stackedModalRef} title="Stacked Modal">
        <p>Click at the button to see a stacked Modal</p>
        <Button onClick={handleOpenModal} text="Open another Modal" />
      </Modal>

      <h1>Modal Playground</h1>
      <div style={{ display: 'flex', gap: '1rem' }}>
        <Button onClick={handleOpenModal} text="Open Modal" />
        <Button
          onClick={() => stackedModalRef.current?.openModal()}
          text="Open Stacked Modal"
        />
      </div>

      <p>{placeholderText}</p>
      <p>{placeholderText}</p>
      <p>{placeholderText}</p>
      <p>{placeholderText}</p>
    </>
  );
};

export default Index;
