/* eslint-disable canonical/filename-match-exported */
import { type NextPage } from 'next';
import { useState, useCallback } from 'react';
import styled from 'styled-components';

// components
import Modal from '@/components/modal';

// styles
const Layout = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
  justify-content: center;
  height: 120vh; // to test scroll
`;

const ModalContent = styled.div`
  display: flex;
  flex-direction: column;
`;

const Button = styled.button`
  background: #9f7aea;
  border-radius: 8px;
  border: transparent;
  cursor: pointer;
  color: white;
  padding: 8px 16px;
  transition: all 0.1s ease-in;
  width: fit-content;

  &:hover {
    background: #44337a;
  }
`;

const Index: NextPage = () => {
  const [open, setOpen] = useState(false);

  // may be overkill, but reducing re-renders as we have a couple useEffects in the modal
  const openHandler = useCallback(() => {
    setOpen(true);
  }, []);

  const closeHandler = useCallback(() => {
    setOpen(false);
  }, []);

  return (
    <Layout>
      <Modal onClose={closeHandler} isOpen={open} title="Modal Title">
        <ModalContent>
          <a href="#">focus me</a>
          <p>This is a paragraph, please read me.</p>
          <div style={{ marginLeft: 'auto' }}>
            <Button onClick={closeHandler}>Close</Button>
          </div>
        </ModalContent>
      </Modal>
      <div id="modal-root" />
      <h1>Welcome to Contra!</h1>
      <Button onClick={openHandler}>Open Modal</Button>
    </Layout>
  );
};

export default Index;
