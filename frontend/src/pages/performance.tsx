/* eslint-disable canonical/filename-match-exported */
import Modal from '@/components/Modal';
import Button from '@/components/Button';
import { styles } from '@/styles';
import { type NextPage } from 'next';
import { useState } from 'react';

const LotsOfInputs: NextPage = () => {
  const [isModalOpen, setModalOpen] = useState(false);

  function handleModalClose() {
    setModalOpen(false);
  }

  return (
    <>
      <h1>Welcome to Contra!</h1>
      <h2>Demo: Performance on many background tabbable elements</h2>
      <div>
        <Button onClick={() => setModalOpen(true)}>Open Modal</Button>
        {[...Array(1000).keys()].map((i) => (
          <Button key={i}>Useless button for focus trap</Button>
        ))}
      </div>

      <Modal
        containerId="modal-container"
        isOpen={isModalOpen}
        onClose={handleModalClose}
      >
        <div style={styles['modal']}>
          <h2>Signup for our newsletter!</h2>
          <form onSubmit={handleModalClose} style={styles['modalForm']}>
            <label>
              Name:
              <input type="text" />
            </label>
            <label>
              Email:
              <input type="text" />
            </label>
            <Button type="submit">Submit</Button>
          </form>
          <Button onClick={handleModalClose}>Close Modal</Button>
        </div>
      </Modal>

      <div id="modal-container" />
    </>
  );
};

export default LotsOfInputs;
