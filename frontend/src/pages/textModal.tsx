/* eslint-disable canonical/filename-match-exported */
import { useState } from 'react';
import { ModalContainer } from './components/modalContainer';
import { Navigation } from './components/nav';

const Carousel = () => {
  const [openModal, setOpenModal] = useState(false);

  const handleToggleModal = () => {
    if (openModal) {
      document.body.classList.remove('no-scroll');
    } else {
      document.body.classList.add('no-scroll');
    }

    setOpenModal(!openModal);
  };

  return (
    <>
      <div className="container">
        <h1 className="heading">Text Modal</h1>
        <Navigation navLinks={[{ name: 'Back', path: '/' }]} />
      </div>
      <div className="container-body">
        <button className="button" onClick={handleToggleModal} type="button">
          Open Text Modal
        </button>
      </div>
      {Boolean(openModal) && (
        <ModalContainer
          handleToggleModal={handleToggleModal}
          modalFooter
          modalHeader="Text Modal"
          type="text"
        />
      )}
    </>
  );
};

export default Carousel;
