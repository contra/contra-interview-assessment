/* eslint-disable canonical/filename-match-exported */
import { type NextPage } from 'next';
import { useState } from 'react';
import ExampleBox from '@/components/ExampleBox';
import Modal from '@/components/Modal';
import SimpleButton from '@/components/SimpleButton';
import { wrapperStyle } from './index.css';

const Index: NextPage = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [otherModalVisible, setOtherModalVisible] = useState(false);
  return (
    <div className={wrapperStyle}>
      <h1>Modal</h1>
      <p>Modal dialogs.</p>
      <h2>Examples</h2>
      <ExampleBox description="Just a simple modal" title="Basic">
        <SimpleButton onClick={() => setModalVisible(true)} type="primary">
          Open Modal
        </SimpleButton>
      </ExampleBox>
      <Modal
        escapable={false}
        maskClosable={false}
        onCancel={() => setOtherModalVisible(false)}
        title="Another Basic Modal"
        visible={otherModalVisible}
      >
        <p>MHMMM</p>
      </Modal>
      <Modal
        okButtonText="Open Other Modal"
        onCancel={() => setModalVisible(false)}
        onOk={() => setOtherModalVisible(true)}
        title="Basic Modal"
        visible={modalVisible}
      >
        <p>Some contents...</p>
        <p>Some contents...</p>
        <p>Some contents...</p>
      </Modal>
    </div>
  );
};

export default Index;
