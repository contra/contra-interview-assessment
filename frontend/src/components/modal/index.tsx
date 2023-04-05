import styled from '@emotion/styled';
import { type ReactNode } from 'react';
import { createPortal } from 'react-dom';

enum ZIndexes {
  Background = '1000',
  Content = '1100',
}

const ModalBackground = styled.div`
  position: absolute;
  background-color: rgba(0, 0, 0, 0.3);
  top: 0px;
  left: 0px;
  right: 0px;
  bottom: 0px;
  z-index: ${ZIndexes.Background};
`;

const ModalContent = styled.div`
  max-width: 640px;
  background-color: white;
  z-index: ${ZIndexes.Content};
`;

const ModalWrapper = styled.div`
  position: absolute;
  top: 0px;
  left: 0px;
  right: 0px;
  bottom: 0px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

type ModalInnerProps = {
  children: ReactNode;
  onClose: () => void;
};

// TODO sort this mess out
const ModalInner = (props: ModalInnerProps) => {
  const { children, onClose } = props;

  return (
    <ModalWrapper>
      <ModalBackground onClick={onClose} />
      <ModalContent>{children}</ModalContent>
    </ModalWrapper>
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

  const portalRoot = container ?? document.body;

  if (!isOpen) {
    return null;
  }

  return createPortal(<ModalInner {...props} />, portalRoot);
};
