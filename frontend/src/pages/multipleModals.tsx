/* eslint-disable canonical/filename-match-exported */
import { useState } from 'react';
import { ModalContainer } from './components/modalContainer';
import { Navigation } from './components/nav';

const multipleModal = [
  {
    modalContent: 'Last modal',
    modalHeader: 'Multiple Modal One',
    modalName: 'multi modal 1',
    type: 'dialog',
  },
  {
    modalContent: 'When you close one the rest will remain',
    modalHeader: 'Multiple Modal Two',
    modalName: 'multi modal 2',
    type: 'dialog',
  },
  {
    modalContent: 'These Modals are stacked on top of each other',
    modalFooter: true,
    modalHeader: 'Multiple Modal Three',
    modalName: 'multi modal 3',
    type: 'dialog',
  },
];

const Settings = () => {
  const [openModal, setOpenModal] = useState(false);

  const handleToggleModals = () => {
    if (openModal) {
      document.body.classList.remove('no-scroll');
    } else {
      document.body.classList.add('no-scroll');
    }

    setOpenModal(!openModal);
  };

  return (
    <div className="container">
      <h1 className="heading">Multiple Modals</h1>
      <Navigation navLinks={[{ name: 'Back', path: '/' }]} />
      <div className="container-body">
        <button className="button" onClick={handleToggleModals} type="button">
          Open Multiple Modals
        </button>
      </div>
      {Boolean(openModal) && (
        <ModalContainer
          handleToggleModal={handleToggleModals}
          modalArrayData={multipleModal}
          modalFooter
        />
      )}
    </div>
  );
};

export default Settings;
