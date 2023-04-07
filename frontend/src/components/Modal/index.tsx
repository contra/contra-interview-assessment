import React, { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import styled, { css } from 'styled-components';

export type ModalProps = {
  children?: React.ReactNode;
  isOpen: boolean;
  onClose: () => void;
};

const ModalOverlay = styled.div<{ isOpen: boolean }>`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: ${({ theme: { zIndex } }) => zIndex.aboveAll};
  display: none;
  background-color: ${({ theme: { colors } }) => colors.opaqueDark};

  ${(props) =>
    props.isOpen &&
    css`
      display: block;
    `}
`;

const ModalContent = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  max-width: 90%;
  max-height: 90%;
  overflow-y: hidden;
  padding: 36px 40px;
  background: ${({ theme: { colors } }) => colors.modalBackground};
  border-radius: ${({ theme: { radius } }) => radius.regular};
  box-shadow: ${({ theme: { shadow } }) => shadow.primary};

  @media (${({ theme: { device } }) => device.mobile}) {
    width: 70%;
    max-height: 80%;
  }

  @media ${({ theme: { device } }) => device.tablet} {
    width: 80%;
    max-height: 80%;
  }
`;

const CloseButton = styled.button`
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: Arial, Helvetica, sans-serif;
  padding: 12px;
  top: 8px;
  right: 8px;
  width: 24px;
  height: 24px;
  border: none;
  cursor: pointer;
  background: ${({ theme: { colors } }) => colors.grey};
  border-radius: ${({ theme: { radius } }) => radius.rounded};
  font-size: ${({ theme: { fontSize } }) => fontSize.xxxl};

  &:focus {
    outline: none;
    box-shadow: ${({ theme: { shadow } }) => shadow.focus};
  }
`;

const Modal: React.FC<ModalProps> = ({ children, isOpen, onClose }) => {
  const [isBrowser, setIsBrowser] = useState(false);
  const modalRef = useRef<HTMLDivElement>(null);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const handleClickOutside = (event: MouseEvent) => {
    if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
      onClose();
    }
  };

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const handleEscape = (event: KeyboardEvent) => {
    if (event.key === 'Escape') {
      onClose();
    }
  };

  useEffect(() => {
    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      document.addEventListener('keydown', handleEscape);
    } else {
      document.removeEventListener('keydown', handleEscape);
      document.removeEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen, handleClickOutside, handleEscape]);

  useEffect(() => {
    setIsBrowser(true);
  }, []);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.body.style.overflow = 'visible';
    };
  }, [isOpen]);

  if (isBrowser && isOpen) {
    return createPortal(
      <ModalOverlay aria-hidden={!isOpen} aria-modal={isOpen} isOpen={isOpen}>
        <ModalContent aria-label="Modal dialog" ref={modalRef} role="dialog">
          <CloseButton aria-label="Close modal" onClick={() => onClose()}>
            &times;
          </CloseButton>
          {children}
        </ModalContent>
      </ModalOverlay>,
      document.body
    );
  }

  return null;
};

export default Modal;
