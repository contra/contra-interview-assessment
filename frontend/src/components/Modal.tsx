import React from 'react';
import ReactDOM from 'react-dom';
import { useModal } from '@/hooks/useModal';

type ModalProps = {
  children: React.ReactNode;
  isOpen: boolean;
  onClose: () => void;
};

export const Modal: React.FC<ModalProps> = ({ isOpen, onClose, children }) => {
  const modalRef = useModal(isOpen, onClose);

  if (!isOpen) return null;

  return ReactDOM.createPortal(
    <div
      aria-modal="true"
      className="fixed inset-0 bg-neutral-800 bg-opacity-50"
      ref={modalRef}
      role="dialog"
      tabIndex={-1}
    >
      <div
        className="w-full h-full flex items-center justify-center"
        onClick={(event) => {
          if (event.target !== modalRef.current) {
            onClose();
          }
        }}
        role="presentation"
      >
        <div className="min-w-fit bg-white p-4 rounded">{children}</div>
      </div>
    </div>,
    document.body
  );
};
