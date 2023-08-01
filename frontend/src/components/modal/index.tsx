import { type ReactNode } from 'react';
import { createPortal } from 'react-dom';
import { InnerModal } from './InnerModal';
import { useIsRunningOnClient } from './utils/useIsRunningOnClient';

export type ModalProps = {
  children: ReactNode;
  container?: HTMLElement;
  isOpen: boolean;
  onClose: () => void;
};

export const Modal = (props: ModalProps) => {
  const { children, container, isOpen, onClose } = props;

  /**
   * We don't have access to the document on the server, so we just don't render the modal.
   * Doing this comes at a cost of not having the modal on the server-generated HTML
   *    if said modal is open immediately, but I consider that OK for our purposes.
   */
  const isRunningOnClient = useIsRunningOnClient();
  const mountElement = isRunningOnClient ? container ?? document.body : null;
  if (!mountElement) {
    return null;
  }

  if (!isOpen) {
    return null;
  }

  return createPortal(
    <InnerModal onClose={onClose}>{children}</InnerModal>,
    mountElement
  );
};
