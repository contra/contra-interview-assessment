/* eslint-disable canonical/filename-match-exported */
import { type NextPage } from 'next';
import { useState } from 'react';
import Modal from '@/components/Modal';

const Index: NextPage = () => {
  const [modals, setModals] = useState([]);
  const openModal = () => {
    const newModal = {
      value: `${Math.floor(Math.random()*100)}`,
      diffX: 0,
      diffY: 0,
      dragging: false
    }
    setModals([...modals, newModal])
  }
  return (
    <div id='root'>
      <h1>Welcome to Contra!</h1>
      <button onClick={openModal}>Create new modal</button>
      <br />
      <br />
      {modals.map((modalObj, i) => (
        <Modal modals={modals} setModals={setModals} index={i} key={i} >{modalObj.value}</Modal>
      ))}
    </div>
  )
};

export default Index;
