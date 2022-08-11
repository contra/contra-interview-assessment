/* eslint-disable canonical/filename-match-exported */
import { Fragment, useState, useEffect, forwardRef, useCallback } from 'react';
import { createPortal } from 'react-dom';
import ModalOverlay from './overlay';
import ModalContent from './content';

const Modal = forwardRef(
  ({ show, onClose, title, isNested, id, children }, ref) => {
    const [hasDocument, setHasDocument] = useState(false);

    useEffect(() => {
      setHasDocument(true);
    }, []);

    const toggleTabIndex = (interactiveEls) => {
      return interactiveEls.forEach((element) => {
        element.tabIndex = show ? -1 : 0;
      });
    };

    const requiredElements = (dialogRef) => {
      const dialogCloseBtn = dialogRef.querySelector('button');

      const title = dialogRef.querySelector('h1');

      const modal = dialogRef.parentElement;

      const modalsContainer = modal.parentElement;

      const bgModals = modalsContainer.querySelectorAll(
        '.modal-container.hidden'
      );

      const activeBgModals = Array.from(
        modalsContainer.querySelectorAll('.modal-container.active')
      ).filter((dialog) => dialog !== modal);

      const contentContainer =
        modalsContainer.parentElement.querySelector('div > div');
      const bgContent = contentContainer.querySelectorAll('a, button');

      const interactiveEls = [...bgModals, ...activeBgModals, ...bgContent];

      return { modal, dialogCloseBtn, title, interactiveEls };
    };

    const handleKeyboard = (e) => {
      const isEscape = e.key === 'Escape';

      if(isEscape) {
        e.preventDefault();
        onClose();
      }

      return;
    };

    const handleClickOutside = (e) => {
      if (ref.current && !ref.current.contains(e.target)) {
        releaseFocus();
        onClose && onClose();
      }
    };

    const trapFocus = () => {
      const { modal, title, interactiveEls } = requiredElements(
        ref.current
      );

      modal.addEventListener('keydown', handleKeyboard);
      modal.addEventListener('click', handleClickOutside);

      modal.setAttribute('tabindex', 0);
      modal.querySelector('h1').focus();
      toggleTabIndex(interactiveEls);

      return;
    };

    const releaseFocus = () => {
      const { modal, interactiveEls } = requiredElements(ref.current);

      modal.removeEventListener('keydown', handleKeyboard);
      modal.removeEventListener('click', handleClickOutside);

      modal.setAttribute('tabindex', -1);
      toggleTabIndex(interactiveEls);
      return;
    };

    useEffect(() => {
      show && trapFocus();
    }, [show]);

    const handleClose = (e, ref) => {
      e.preventDefault();
      releaseFocus();

      const modalId = e.target.dataset.modal;
      const targetedModal = document.getElementById(modalId);
      targetedModal === ref.current && onClose();

      return;
    };

    const modalContent = (
      <div className={show ? 'active' : ''} id={`${id}-container`}>
        <ModalOverlay isOpen={show} />
        <ModalContent
          ref={ref}
          isOpen={show}
          id={id}
          title={title}
          handleClose={handleClose}
        >
          {children}
        </ModalContent>
      </div>
    );

    return hasDocument
      ? createPortal(modalContent, document.getElementById('modal-root'))
      : null;
  }
);

export default Modal;
