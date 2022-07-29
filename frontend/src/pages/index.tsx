/* eslint-disable canonical/filename-match-exported */
import { type NextPage } from 'next';
import Modal from "../../components/modal"
import { useState } from 'react';

const Index: NextPage = () => {

  const [isOpen, setIsOpen] = useState(false)

  return (
  <div>
    <>
    <h1>Click for Modal</h1>
    <button onClick={()=> setIsOpen((open) => !open)}>Modal Popup</button>
    {isOpen ? <Modal/>: null}
    </>
  </div>
  );
};

export default Index;
