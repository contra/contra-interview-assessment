/* eslint-disable canonical/filename-match-exported */
import { type NextPage } from 'next';
import { useState } from 'react';
import Modal from '@/components/Modal';

const Index: NextPage = () => {
  const [modalVisible, setModalVisible] = useState(false);
  return (
    <>
      <h1>Welcome to Contra!</h1>
      <button onClick={() => setModalVisible(true)} type="button">
        Open Modal
      </button>
      <Modal
        onCancel={() => setModalVisible(false)}
        title="Basic Modal"
        visible={modalVisible}
      >
        <p>Some contents...</p>
        <p>Some contents...</p>
        <p>Some contents...</p>
      </Modal>
    </>
  );
};

export default Index;
