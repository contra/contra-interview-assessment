import { useState, useEffect } from 'react';
import Portal from './Portal';
import { Modal } from './modal';
import { type ModalContainerType } from './types';

const ModalContainer = ({
  buttonText,
  isOpen,
  modalArrayData,
  modalHeader,
  type,
  modalFooter,
  submitAction,
  handleClose,
}: ModalContainerType) => {
  const [modalArray, setModalArray] = useState(modalArrayData);
  const [scroll, setScroll] = useState(false);

  useEffect(() => {
    document.body.classList.add('no-scroll');
    return () => {
      document.body.classList.remove('no-scroll');
    };
  }, [scroll]);

  const closeModalId = (modalName: string) => {
    if (modalArray?.length === 1) {
      handleClose();
      setScroll(!scroll);
    } else {
      // filter array by modalName
      const filteredArray = modalArray?.filter(
        (element) => element.modalName !== modalName
      );
      setModalArray(filteredArray);
    }
  };

  const closeModal = () => {
    setScroll(!scroll);
    handleClose();
  };

  if (isOpen) {
    return (
      <Portal>
        <div aria-hidden className="modal--mask">
          {/* This Container is able to render multiple modals with different purposes */}
          {modalArray?.length ? (
            <>
              {modalArray.map((modal) => (
                <Modal
                  buttonText={modal.buttonText}
                  closeModal={closeModal}
                  closeModalId={closeModalId}
                  key={modal.modalName}
                  modalContent={modal.modalContent}
                  modalFooter={modal.modalFooter}
                  modalHeader={modal.modalHeader}
                  modalName={modal.modalName}
                  submitAction={modal.submitAction}
                  type={modal.type}
                />
              ))}
            </>
          ) : (
            // can also render a single modal
            <Modal
              buttonText={buttonText}
              closeModal={closeModal}
              modalContent="This Content will be in the modal"
              modalFooter={modalFooter}
              modalHeader={modalHeader}
              modalName="test-modal"
              submitAction={submitAction}
              type={type}
            />
          )}
        </div>
      </Portal>
    );
  }

  return null;
};

export { ModalContainer };