/* eslint-disable canonical/filename-match-exported */
import { type NextPage } from 'next';
import { useState } from 'react';
import { ModalContainer } from './components/modalContainer';
import { Navigation } from './components/nav';

const Index: NextPage = () => {
  const [openModal, setOpenModal] = useState(false);

  const handleToggleModal = () => {
    if (openModal) {
      // remove lock on scroll
      document.body.classList.remove('no-scroll');
    } else {
      // locks scroll on body
      document.body.classList.add('no-scroll');
    }

    setOpenModal(!openModal);
  };

  const navLink = [
    {
      name: 'Multiple Modals',
      path: '/multipleModals',
    },
    {
      name: 'Text Modal',
      path: '/textModal',
    },
  ];

  return (
    <div className="container">
      <h1 className="heading">Everyone Loves Modal</h1>
      <Navigation navLinks={navLink} />
      <div className="container-body">
        <button className="button" onClick={handleToggleModal} type="button">
          Open single modal
        </button>
      </div>
      {Boolean(openModal) && (
        <ModalContainer
          handleToggleModal={handleToggleModal}
          modalFooter={false}
          modalHeader="Single Modal"
        />
      )}
    </div>
  );
};

export default Index;
