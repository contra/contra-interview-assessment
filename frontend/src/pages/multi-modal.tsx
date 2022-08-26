/* eslint-disable canonical/filename-match-exported */
import Modal from '@/components/Modal';
import Button from '@/components/Button';
import { styles } from '@/styles';
import { type NextPage } from 'next';
import { useState } from 'react';

const LotsOfInputs: NextPage = () => {
  const [isModalOpen, setModalOpen] = useState(false);
  const [isOtherModalOpen, setOtherModalOpen] = useState(false);

  /**
   * For demo purposes only
   */

  function closeFirstModal() {
    setModalOpen(false);
  }

  function closeSecondModal() {
    setOtherModalOpen(false);
  }

  return (
    <>
      <h1>Welcome to Contra!</h1>
      <h2>Demo: Multi modal</h2>

      <Button onClick={() => setModalOpen(true)}>Open Modal</Button>
      <Button>Useless button for focus trap</Button>

      <Modal
        containerId="first-modal-container"
        isOpen={isModalOpen}
        onClose={closeFirstModal}
        aria-labelledby="dialog-title-1"
      >
        <div style={styles['modal']}>
          <h2 id="dialog-title-1">Signup for our newsletter!</h2>
          <form onSubmit={closeFirstModal} style={styles['modalForm']}>
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
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <Button onClick={() => setOtherModalOpen(true)}>No thanks</Button>
            <Button onClick={closeFirstModal}>Cancel</Button>
          </div>
        </div>
      </Modal>

      <Modal
        containerId="second-modal-container"
        isOpen={isOtherModalOpen}
        onClose={closeSecondModal}
        aria-labelledby="dialog-title-2"
      >
        <div style={{ ...styles['modal'], height: '20vh' }}>
          <h2 id="dialog-title-2">Are you sure you want to cancel?</h2>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <Button
              onClick={() => {
                closeSecondModal();
                closeFirstModal();
              }}
            >
              Yes
            </Button>
            <Button
              onClick={() => {
                closeSecondModal();
                setModalOpen(true);
              }}
            >
              No
            </Button>
          </div>
        </div>
      </Modal>

      <div id="first-modal-container" />
      <div id="second-modal-container" />
    </>
  );
};

export default LotsOfInputs;
