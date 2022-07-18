/* eslint-disable canonical/filename-match-exported */
import { type NextPage } from 'next';
import { useState } from 'react';
import Button from '@/components/Button';
import Modal from '../components/Modal';

const Index: NextPage = () => {
  const [modal1, setModal1] = useState<boolean>(false);
  const [modal2, setModal2] = useState<boolean>(false);
  const [modal3, setModal3] = useState<boolean>(false);

  return (
    <>
      <h1>Welcome to Contra!</h1>

      <Button onClick={() => setModal1(true)}>
        Click me to open a modal!
      </Button>

      <div style={{height: '200vh'}} />

      {modal1 && <Modal
        handleClose={() => setModal1(false)}
        title="Modal 1">
        <p>This is content for modal 1.</p>
        <Button onClick={() => setModal2(true)}>
          Click me to open a modal!
        </Button>
      </Modal>}

      {modal2 && <Modal 
        handleClose={() => setModal2(false)}
        title="Modal 2">
        <p>This is content for modal 2.</p>
        <Button onClick={() => setModal3(true)}>
          Click me to open a modal!
        </Button>
      </Modal>}

      {modal3 && <Modal 
        handleClose={() => setModal3(false)}
        title="Modal 3">
        <p>This is content for modal 3.</p>
      </Modal>}
    </>
  );
};

export default Index;
