import React, { useEffect } from 'react';
import ReactDOM from 'react-dom';
import { useModalStack } from '@/context/ModalContext';
import { useModal } from '@/hooks/useModal';

type ModalProps = {
  children: React.ReactNode;
  id: string;
  isOpen: boolean;
  onClose: () => void;
};

export const Modal: React.FC<ModalProps> = ({
  id,
  isOpen,
  onClose,
  children,
}) => {
  // eslint-disable-next-line react/hook-use-state
  const modalRef = useModal(isOpen, onClose);
  const { modalStack, pushModal, popModal } = useModalStack();

  useEffect(() => {
    // eslint-disable-next-line no-debugger
    if (isOpen) {
      pushModal(id);
    } else {
      popModal();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen, id]);

  if (!isOpen) return null;

  return ReactDOM.createPortal(
    <div
      aria-modal="true"
      className="fixed inset-0 bg-neutral-800 bg-opacity-50 "
      ref={modalRef}
      role="dialog"
      style={{ zIndex: 1_000 + modalStack.indexOf(id) }}
      tabIndex={-1}
    >
      <div
        className="w-full h-full flex items-center justify-center"
        onClick={(event) => {
          if (
            event.target === modalRef.current &&
            modalStack[modalStack.length - 1] === id
          ) {
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
