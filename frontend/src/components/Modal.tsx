import React from 'react';
import styled, { css } from 'styled-components';

type ModalProps = {
  children: React.ReactNode;
  isOpen: boolean;
  onClose: () => void;
};

/* 
  TODO List

  1 - Should have a max-height and scroll from there
  2 - Should work with dark and white theme
  3 - Implement Test
  4- Implement Storybook
*/

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
  overflow: auto;
  padding: 36px 40px;
  background: ${({ theme: { colors } }) => colors.modalBackground};
  border-radius: ${({ theme: { radius } }) => radius.regular};
  box-shadow: ${({ theme: { shadow } }) => shadow.primary};

  @media (${({ theme: { device } }) => device.mobile}) {
    width: 70%;
  }

  @media ${({ theme: { device } }) => device.tablet} {
    width: 80%;
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
  return (
    <ModalOverlay aria-hidden={!isOpen} aria-modal={isOpen} isOpen={isOpen}>
      <ModalContent aria-label="Modal dialog" role="dialog">
        <CloseButton aria-label="Close modal" onClick={onClose}>
          &times;
        </CloseButton>
        {children}
      </ModalContent>
    </ModalOverlay>
  );
};

export default Modal;
