/* eslint-disable canonical/filename-match-exported */
import { type NextPage } from 'next';
import Head from 'next/head';
import Link from 'next/link';
import { useState } from 'react';
import styled from 'styled-components';
import Modal, { type ModalSize } from '@/components/Modal/Modal';

const MainPage = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
  width: 100vw;
  flex-direction: column;
  gap: 10px;
`;

const SecondModal = () => {
  const [isModal2Open, setIsModal2Open] = useState(false);

  return (
    <>
      <button onClick={() => setIsModal2Open(true)} type="button">
        Open second smaller modal
      </button>
      <Modal
        isOpen={isModal2Open}
        onClose={() => setIsModal2Open(false)}
        size="sm"
      >
        <Modal.Header>Second Modal</Modal.Header>
        <Modal.Body>
          <p>Some information can go here</p>
          <p>
            Also some JSX can go here and you can render whatever want in here
          </p>
          <div style={{ marginTop: '20px' }}>
            <button type="button"> Dummy button</button>
          </div>
          <div style={{ marginTop: '20px' }}>
            <button type="button"> This is also a dummy button</button>
          </div>
          <div style={{ marginTop: '20px' }}>
            <button type="button"> This button also does nothing</button>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Modal.CloseButton> Close </Modal.CloseButton>
        </Modal.Footer>
      </Modal>
    </>
  );
};

const FirstModal = ({
  isOpen,
  onClose,
  size,
  hasOverlay,
}: {
  hasOverlay?: boolean;
  isOpen: boolean;
  onClose: (value: boolean) => void;
  size?: ModalSize;
}) => {
  return (
    <div>
      <Modal
        hasOverlay={hasOverlay}
        isOpen={isOpen}
        onClose={() => onClose(false)}
        size={size}
      >
        <Modal.Header>First modal</Modal.Header>
        <Modal.Body>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris id
            neque ultrices, tempor eros a, volutpat justo. Nullam pharetra at ex
            ac semper. Lorem ipsum dolor sit amet, consectetur adipiscing elit.
            In feugiat blandit diam, et cursus lorem eleifend at. Phasellus
            imperdiet mi et mattis consectetur. Pellentesque sed condimentum
            nunc. Curabitur in ex feugiat, hendrerit turpis a, lobortis magna.
            Sed id mollis libero. Proin sit amet rhoncus neque. Aenean justo
            elit, sagittis sit amet mollis non, ullamcorper sed neque.
            Suspendisse sagittis eleifend iaculis. Praesent finibus, metus at
            interdum varius, tellus leo ultrices elit, vitae auctor mi mi ac
            magna. Suspendisse ex turpis, imperdiet quis lacus vitae, placerat
            feugiat ex. Quisque vehicula, orci non fringilla molestie, lorem
            tellus tristique dui, sed hendrerit nulla nisi ac massa.
          </p>

          <p>
            Pellentesque sollicitudin elit et cursus fringilla. Morbi cursus
            magna et libero egestas, sit amet convallis massa bibendum. Morbi
            finibus ligula sit amet volutpat cursus. Nam placerat eu lorem eu
            pellentesque. Aliquam erat volutpat. Vestibulum ac sapien erat. Nunc
            nec rhoncus lorem, ac ultrices augue.
          </p>
          <SecondModal />
          <div style={{ marginTop: '20px' }}>
            <button type="button"> Dummy button</button>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Modal.CloseButton> Close </Modal.CloseButton>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

const Index: NextPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isBiggerModalOpen, setIsBiggerModalOpen] = useState(false);
  return (
    <MainPage>
      <Head>
        <title>Contra Assessment</title>
      </Head>
      <button onClick={() => setIsModalOpen(true)} type="button">
        Open first modal
      </button>

      <FirstModal isOpen={isModalOpen} onClose={setIsModalOpen} />

      <button onClick={() => setIsBiggerModalOpen(true)} type="button">
        Open bigger modal without an overlay
      </button>

      <FirstModal
        hasOverlay={false}
        isOpen={isBiggerModalOpen}
        onClose={setIsBiggerModalOpen}
        size="xl"
      />

      <Link href="/users"> Go to Users page</Link>
    </MainPage>
  );
};

export default Index;
