/* eslint-disable canonical/filename-match-exported */
import { useState } from 'react';
import Modal from '@/../components/Modal/Modal';
import ModalContent from '@/../components/ModalContent/ModalContent';

type ModalType = {
  id: number;
  isOpen: boolean;
  mostRecent: boolean;
};

const Index = () => {
  const [modals, setModals] = useState<ModalType[]>([]);
  const [id, setId] = useState<number>(0);

  const openModal = () => {
    setId((prevId) => prevId + 1);
    setModals((prevModals) => [
      ...prevModals,
      { id: id + 1, isOpen: true, mostRecent: true },
    ]);
  };

  const closeModal = (modalId: number) => {
    const index = modals.findIndex((modal) => modal.id === modalId);
    const newModals = [...modals];
    newModals.splice(index, 1);

    if (newModals.length > 0) {
      const mostRecentIndex = newModals.length - 1;
      const updatedModal = {
        ...newModals[mostRecentIndex],
        mostRecent: true,
      };
      newModals.splice(mostRecentIndex, 1, updatedModal as ModalType);
    }

    setModals(newModals);

    setId((prevId) => prevId - 1);

    if (newModals.length === 0) {
      setId(0);
    }
  };

  return (
    <div>
      <button onClick={openModal}>Open Modal</button>
      {modals.map((modal) => (
        <Modal
          key={modal.id}
          id={modal.id}
          isOpen={modal.isOpen}
          onClose={() => closeModal(modal.id)}
          mostRecent={modal.mostRecent}
        >
          <ModalContent
            id={modal.id}
            openModal={openModal}
            closeModal={() => closeModal(modal.id)}
          />
        </Modal>
      ))}
    </div>
  );
};

export default Index;
