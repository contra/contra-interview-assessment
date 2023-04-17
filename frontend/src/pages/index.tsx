/* eslint-disable canonical/filename-match-exported */

import { type NextPage } from 'next';
import { useState } from 'react';
import Modal from 'components/Modal';

const Index: NextPage = () => {
  const [modal1active, setModal1active] = useState(false);
  const [modal2active, setModal2active] = useState(false);
  const [modal3active, setModal3active] = useState(false);

  return (
    <div
      style={{
        alignItems: 'baseline',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <h1>Welcome to Contra!</h1>
      <button onClick={() => setModal1active(true)} type="button">
        Open Modal 1
      </button>
      <button onClick={() => setModal2active(true)} type="button">
        Open Modal 2
      </button>
      <button onClick={() => setModal3active(true)} type="button">
        Open Modal 3, which has an autofocus attribute
      </button>
      <button
        onClick={() => {
          setModal1active(true);
          setTimeout(() => setModal2active(true), 1_000);
        }}
        type="button"
      >
        Open Modal 1 and one second later modal 2
      </button>
      <button
        onClick={() => {
          setModal2active(true);
          setTimeout(() => setModal1active(true), 1_000);
        }}
        type="button"
      >
        Open Modal 2 and one second later modal 1
      </button>
      <button
        onClick={() => {
          setModal1active(true);
          setModal2active(true);
          setModal3active(true);
        }}
        type="button"
      >
        Open all three modals at once
      </button>
      {modal1active && (
        <Modal onClose={() => setModal1active(false)}>
          Hi there from modal 1!
          <button type="button">A</button>
          <button type="button">B</button>
        </Modal>
      )}
      {modal2active && (
        <Modal onClose={() => setModal2active(false)}>
          Hi there from modal 2!
          <button type="button">A</button>
          <button type="button">B</button>
        </Modal>
      )}
      {modal3active && (
        <Modal onClose={() => setModal3active(false)}>
          Hi there from modal 3!
          <button type="button">A</button>
          <button autoFocus type="button">
            B - Autofocus
          </button>
        </Modal>
      )}
    </div>
  );
};

export default Index;
