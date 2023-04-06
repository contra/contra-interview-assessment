import { type ReactNode, useState } from 'react';
import { createPortal } from 'react-dom';
import { useModalId } from './modalHierarchy';
import { useCloseOnPressingEsc } from './useCloseOnPressingEsc';
import { useIsRunningOnClient } from './useIsRunningOnClient';
import { useScrollLock } from './useScrollLock';
import { FocusTrap } from './utils/FocusTrap';

type ModalInnerProps = {
  children: ReactNode;
  onClose: () => void;
};

// TODO sort this mess out
const ModalInner = (props: ModalInnerProps) => {
  const { children, onClose } = props;

  const modalId = useModalId();
  useCloseOnPressingEsc(modalId, onClose);

  useScrollLock();

  /**
   * It's unusual to be using a HTML element's ref() callback to set state,
   *    but inside FocusTrap we need to run effects when the modalContentElement changes.
   */
  const [modalContentElement, setModalContentElement] =
    useState<HTMLDivElement | null>(null);

  return (
    <FocusTrap element={modalContentElement}>
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
    </FocusTrap>
  );
};

export type ModalProps = {
  children: ReactNode;
  container?: HTMLElement;
  isOpen: boolean;
  onClose: () => void;
};

export const Modal = (props: ModalProps) => {
  const { container, isOpen } = props;
  const isRunningOnClient = useIsRunningOnClient();

  /**
   * We don't have access to the document on the server, so we just don't render the modal.
   * Doing this comes at a cost of not having the modal on the server-generated HTML
   *    if said modal is open immediately, but I consider that OK for our purposes.
   */
  const portalRoot = isRunningOnClient ? container ?? document.body : null;
  if (!portalRoot) {
    return null;
  }

  if (!isOpen) {
    return null;
  }

  return createPortal(<ModalInner {...props} />, portalRoot);
};
