/* eslint-disable canonical/filename-match-exported */
import Modal from '@/components/ui/Modal';
import ItemsListModal from '@/components/ui/ItemsListModal';
import { type NextPage } from 'next';
import { useState } from 'react';

const Index: NextPage = () => {
  const [showItems, setShowItems] = useState(false);
  <button onClick={() => setShowItems(!showItems)}>Open Modal</button>;

  return (
    <>
      <h1>Welcome to Contra!</h1>
      <button onClick={() => setShowItems(!showItems)}>Open Modal</button>
      {showItems && (
        <Modal handleClose={() => setShowItems(!showItems)}>
          <ItemsListModal
            handleClose={() => setShowItems(false)}
          ></ItemsListModal>
        </Modal>
      )}
    </>
  );
};

export default Index;
