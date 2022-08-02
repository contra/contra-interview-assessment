/* eslint-disable canonical/filename-match-exported */
import { type NextPage } from 'next';
import React, { useRef } from 'react';

import Modal from '@/components/Modal/Modal';

import { modalText } from '@/constants';

import { ModalRef } from '@/components/Modal/Modal';

const Index: NextPage = () => {
  const modalRef = useRef<ModalRef>(null);
  const childModalRef = useRef<ModalRef>(null);

  const handleModalOpen = () => {
    modalRef?.current?.openModal();
  };

  const handleModalClose = () => {
    modalRef?.current?.closeModal();
  };

  const handleSecondModalOpen = () => {
    childModalRef?.current?.openModal();
  };

  const handleSecondModalClose = () => {
    childModalRef?.current?.closeModal();
  };

  return (
    <>
      <button onClick={handleModalOpen}>Open Modal</button>
      <Modal
        title="My modal"
        width={500}
        onClose={handleModalClose}
        ref={modalRef}
      >
        <>
          <button onClick={handleSecondModalOpen}>Open another modal</button>
          <p>{modalText}</p>
          <Modal
            title="Child modal"
            width={300}
            height={400}
            onClose={handleSecondModalClose}
            ref={childModalRef}
            dismissOnFocusLost={false}
          >
            <h2>Second modal</h2>
          </Modal>
        </>
      </Modal>
    </>
  );
};

export default Index;
