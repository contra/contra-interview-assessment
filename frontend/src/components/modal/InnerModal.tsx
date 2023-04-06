import { type ReactNode, useState } from 'react';
import { FocusTrap } from './utils/FocusTrap';
import { useModalId } from './utils/modalHierarchy';
import { useCloseOnPressingEsc } from './utils/useCloseOnPressingEsc';
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
