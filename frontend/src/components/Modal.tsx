import ReactPortal from './ReactPortal';
import { useFocus, useScrollBlock } from '@/Utils/hooks.util';
import React, { useRef } from 'react';

export type ModalProps = {
  children: React.ReactElement;
  handleClose: () => void;
  isOpen: boolean;
};

const Modal = ({ isOpen, handleClose, children }: ModalProps) => {
  useScrollBlock(isOpen);
  const modalRef = useRef<HTMLDivElement>(null);
  useFocus(handleClose, modalRef);

  return (
    <>
      {isOpen && (
        <ReactPortal wrapperId="react-portal-modal-container">
          <div
            aria-labelledby="modal-title"
            aria-modal="true"
            className="modal"
            data-testid="modal-container"
            id="modal"
            ref={modalRef}
            role="dialog"
          >
            This is the modal
            {children}
            <button
              data-testid="modal-close"
              onClick={handleClose}
              type="button"
            >
              close the modal
            </button>
          </div>
        </ReactPortal>
      )}
    </>
  );
};

export default Modal;
