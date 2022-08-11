import { useState, useEffect, createRef } from 'react';
import styled from 'styled-components';
import Modal from './modal';
import Controls from './controls';
import ModalToggleButton from './toggle-button';

const ModalWrapper = ({
  openLabel,
  title,
  id,
  isNested,
  showFooterControls,
  showFooterClose,
  altBtn,
  children,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const buttonRef = createRef();
  const modalRef = createRef();

  const openModal = () => {
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  const returnFocus = () => {
    buttonRef.current.focus();
  }

  const handleOpenModal = (e) => {
    const modalId = e.target.dataset.modal;
    const targetModal = document.getElementById(modalId);

    return targetModal === modalRef.current && openModal();
  };

  const handleCloseModal = () => {
    closeModal();
    return;
  };

  useEffect(() => {
    !isOpen &&  returnFocus();
  }, [isOpen, returnFocus]);

  const modalLabel = openLabel ? openLabel : title;

  return (
    <>
      <ModalToggleButton
        ref={buttonRef}
        id={`open-modal-${id}`}
        label={`Open ${modalLabel} Modal`}
        handleToggle={handleOpenModal}
        modalRef={modalRef}
        targetModal={`modal-${id}`}
      >
        {modalLabel}
      </ModalToggleButton>

      <Modal
        ref={modalRef}
        isNested={isNested}
        show={isOpen}
        onClose={handleCloseModal}
        title={modalLabel}
        id={id}
      >
        {children}

        {showFooterControls ? (
          <Controls
            id={id}
            title={modalLabel}
            showFooterClose={showFooterClose}
            modalRef={modalRef}
            closeModal={handleCloseModal}
          >
            {altBtn ? altBtn : null}
          </Controls>
        ) : null}
      </Modal>
    </>
  );
};

export default ModalWrapper;
