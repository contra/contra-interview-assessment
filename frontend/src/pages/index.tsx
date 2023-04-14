/* eslint-disable canonical/filename-match-exported */

import Modal from 'components/Modal';
import { type NextPage } from 'next';
import { useState } from 'react';

const Index: NextPage = () => {
  const [isModal1active, setModal1active] = useState(false);
  const [isModal2active, setModal2active] = useState(false);
  const [isModal3active, setModal3active] = useState(false);

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'baseline',
      }}
    >
      <h1>Welcome to Contra!</h1>
      <button onClick={() => setModal1active(true)}>Open Modal 1</button>
      <button onClick={() => setModal2active(true)}>Open Modal 2</button>
      <button onClick={() => setModal3active(true)}>
        Open Modal 3, which has an autofocus attribute
      </button>
      <button
        onClick={() => {
          setModal1active(true);
          setTimeout(() => setModal2active(true), 1000);
        }}
      >
        Open Modal 1 and one second later modal 2
      </button>
      <button
        onClick={() => {
          setModal2active(true);
          setTimeout(() => setModal1active(true), 1000);
        }}
      >
        Open Modal 2 and one second later modal 1
      </button>
      <button
        onClick={() => {
          setModal1active(true);
          setModal2active(true);
          setModal3active(true);
        }}
      >
        Open all three modals at once
      </button>
      {isModal1active && (
        <Modal onClose={() => setModal1active(false)}>
          Hi there from modal 1!
          <button>A</button>
          <button>B</button>
        </Modal>
      )}
      {isModal2active && (
        <Modal onClose={() => setModal2active(false)}>
          Hi there from modal 2!
          <button>A</button>
          <button>B</button>
        </Modal>
      )}
      {isModal3active && (
        <Modal onClose={() => setModal3active(false)}>
          Hi there from modal 3!
          <button>A</button>
          <button autoFocus>B - Autofocus</button>
        </Modal>
      )}
    </div>
  );
};

export default Index;
