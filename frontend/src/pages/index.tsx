/* eslint-disable canonical/filename-match-exported */
import { type NextPage } from 'next';
import Modal from '@/components/Modal/modal';
import ModalContent from '@/components/ModalContent/modalContent';
import React, { useState } from 'react';

const Index: NextPage = () => {
  const [showModal, setShowModal] = useState(false);

  return (
    <div>
      <h1>Welcome to Contra!</h1>
      <button
        onClick={() => setShowModal(true)}
      >
        {'Click to open modal'}
      </button>
      <Modal
        isShowing={showModal}
        closeModal={() => setShowModal(false)}
        content={[<ModalContent />]}
        headline='Sample Modal'
      />
    </div>
  );
};

export default Index;
