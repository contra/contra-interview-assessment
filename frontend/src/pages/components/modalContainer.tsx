import { useState } from 'react';
import ReactDom from 'react-dom';
import { Modal } from './modal';

type modalData = {
  modalContent: string;
  modalFooter?: boolean;
  modalHeader?: string;
  modalName: string;
  type: string;
};

type ModalContainer = {
  handleToggleModal: (event?: Event) => void;
  modalArrayData?: modalData[];
  modalFooter: boolean;
  modalHeader?: string;
  type?: 'dialog' | 'text';
};
const ModalContainer = ({
  handleToggleModal,
  modalArrayData,
  modalHeader,
  type,
  modalFooter,
}: ModalContainer) => {
  const [modalArray, setModalArray] = useState(modalArrayData);

  const closeModalId = (modalName: string, isEc = false) => {
    if (isEc && modalArray) {
      if (modalArray.length === 1) {
        handleToggleModal();
      }

      // lastElement of the modal array
      const last = [...modalArray.slice(-1)];
      // filter array and remove the last element which on the top of stack
      const filteredArray = modalArray.filter(
        (element) => element.modalName !== last[0]?.modalName
      );
      setModalArray(filteredArray);
      return;
    }

    if (modalArray?.length === 1) {
      handleToggleModal();
    } else {
      // filter array by modalName
      const filteredArray = modalArray?.filter(
        (element) => element.modalName !== modalName
      );
      setModalArray(filteredArray);
    }
  };

  return ReactDom.createPortal(
    <div aria-hidden className="modal--mask">
      {modalArray?.length ? (
        <>
          {modalArray.map((modal) => (
            <Modal
              closeModal={handleToggleModal}
              closeModalId={closeModalId}
              key={modal.modalName}
              modalContent={modal.modalContent}
              modalFooter={modal.modalFooter}
              modalHeader={modal.modalHeader}
              modalName={modal.modalName}
              type={modal.type}
            />
          ))}
        </>
      ) : (
        <Modal
          closeModal={handleToggleModal}
          modalContent="This Content will be in the modal"
          modalFooter={modalFooter}
          modalHeader={modalHeader}
          modalName="test-modal"
          submitAction={() => alert('Submit')}
          type={type}
        />
      )}
    </div>,
    document.getElementById('__next')
  );
};

export { ModalContainer };
