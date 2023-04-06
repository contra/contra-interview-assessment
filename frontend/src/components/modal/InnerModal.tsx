import { type ReactNode, useState } from 'react';
import { useModalId } from './utils/modalHierarchy';
import { useCloseOnPressingEsc } from './utils/useCloseOnPressingEsc';
import { useFocusTrap } from './utils/useFocusTrap';
import { useScrollLock } from './utils/useScrollLock';

type InnerModalProps = {
  children: ReactNode;
  onClose: () => void;
};

export const InnerModal = (props: InnerModalProps) => {
  const { children, onClose } = props;

  const modalId = useModalId();

  useCloseOnPressingEsc(modalId, onClose);

  useScrollLock();

  // We need to run effects in useFocusTrap when this changes, so we're using state instead of a ref.
  const [modalContentElement, setModalContentElement] =
    useState<HTMLDivElement | null>(null);
  useFocusTrap(modalId, modalContentElement);

  return (
    <div
      className="contra--modal-wrapper"
      ref={setModalContentElement}
      role="presentation"
    >
      {/* We're listening to Esc events on document.body itself. */}
      {/* eslint-disable-next-line jsx-a11y/no-static-element-interactions, jsx-a11y/click-events-have-key-events */}
      <div className="contra--modal-background" onClick={onClose} />
      <div className="contra--modal-content">{children}</div>
    </div>
  );
};
