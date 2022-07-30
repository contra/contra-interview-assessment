/* eslint-disable canonical/filename-match-exported */
import { type NextPage } from 'next';
import { useEffect, useState } from 'react';
import Modal from '../components/Modal';
import Textbox from '../components/Textbox';
import Navbar from '../components/Navbar';
import { iModal } from '@/types';

const Index: NextPage = () => {
  const [modals, setModals] = useState([]);
  const openModal = () => {
    const largestZ = modals.reduce((pre, cur: iModal) => {
        return Math.max(pre, (cur.styles?.zIndex || 10));
      }, 0);
    const newModal = {
      active: 'A',
      valueA: `${Math.floor(Math.random()*100)}`,
      valueB: `${Math.floor(Math.random()*100)}`,
      diffX: 0,
      diffY: 0,
      dragging: false,
      styles: {zIndex: modals.length ? largestZ + 1 : 10},
    }
    setModals([...modals, newModal])
  }
  const closeModals = () => {
    setModals([]);
  }
  useEffect(() => {
    if (modals.length === 0){
      document.getElementById('root')?.classList.toggle('blurred', false);
      document.querySelector('body')?.classList.toggle('scrollLock', false);
    } else {
      document.getElementById('root')?.classList.toggle('blurred', true);
      document.querySelector('body')?.classList.toggle('scrollLock', true);
    }
  }, [modals]);

  return (
    <div id='root'>
      <Navbar openModal={openModal} closeModals={closeModals}/>
      <Textbox/>
      {modals.map((modalObj, i) => (
        <Modal modals={modals} setModals={setModals} index={i} key={i}/>
      ))}
    </div>
  )
};

export default Index;
