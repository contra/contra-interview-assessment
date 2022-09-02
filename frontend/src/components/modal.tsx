import React, { useRef } from 'react';
import styled from 'styled-components';
import { FiX as CloseIcon } from 'react-icons/fi';
import { createPortal } from 'react-dom';
import FocusTrap from 'focus-trap-react';

// hooks
import { useDisableScroll, useOnClickOutside, useOnEscKeypress } from '@/hooks';

// styles
const ModalOverlay = styled.div`
  align-items: center;
  background: rgba(0, 0, 0, 0.1);
  backdrop-filter: blur(2px);
  display: flex;
  height: 100vh;
  justify-content: center;
  left: 0;
  position: fixed;
  top: 0;
  width: 100vw;
  z-index: auto;
`;

const ModalContainer = styled.div`
  background: white;
  border-radius: 0.375rem;
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1),
    0 4px 6px -2px rgba(0, 0, 0, 0.05);
  display: flex;
  flex-direction: column;
  padding: 16px 24px;
  position: relative;
`;

const ModalWrapper = styled.div`
  max-width: 28rem;
  width: 90%;
`;

const CloseButton = styled.button`
  align-items: center;
  background: transparent;
  border: transparent;
  border-radius: 9999px;
  cursor: pointer;
  display: flex;
  height: 32px;
  position: absolute;
  right: 12px;
  top: 8px;
  width: 32px;

  transition: all 0.1s ease-in;

  &:hover {
    background-color: lightblue;
    color: white;
  }
`;

const ModalHeader = styled.h1`
  color: #2d3748;
  font-size: 28px;
  margin-bottom: 12px;
`;

const ModalBody = styled.div`
  color: #718096;
  font-size: 16px;
`;

/**
 * Todo:
 * Focus Management - use FocusTrap or Gist
 * Background scroll-locking - done
 * Tab navigation - done
 * React portals - done
 * Multi-modal environment - did not attempt
 * Accessibility - aria, need to test
 * Mobile - done
 */

type ModalType = {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children?: React.ReactNode;
};

/**
 * Basic Modal inspired by Chakra-UI Modal. Supports focus management, background scroll-locking, tab navigation, is a11y compliant and mobile friendly.
 * Unfortunately ran out of time before implementing multi-modal environment.
 *
 * Decided to use npm package focus-trap-react for focus management as it is well maintained and scaleable.
 * As for a custom focus solution, I was thinking something along this (https://gist.github.com/asvny/99988385aa5b1573be49309bbaa0f588).
 * However that relies on querying all possible focusable elements (which is an exhausive list),
 * and would need to be maintained to make sure no new elements would slip by.
 */
const Modal = ({ isOpen, onClose, title, children }: ModalType) => {
  const modalWrapperRef = useRef<HTMLDivElement>(null);

  useOnEscKeypress(onClose);
  useDisableScroll();
  useOnClickOutside(modalWrapperRef, onClose);

  if (isOpen) {
    const component = (
      <ModalOverlay>
        <FocusTrap active={isOpen}>
          <ModalWrapper ref={modalWrapperRef}>
            <ModalContainer
              role="dialog"
              aria-modal="true"
              aria-labelledby="header"
              aria-describedby="body"
            >
              <ModalHeader id="header">{title}</ModalHeader>
              <CloseButton onClick={onClose}>
                <CloseIcon size={32} />
              </CloseButton>
              <ModalBody id="body">{children}</ModalBody>
            </ModalContainer>
          </ModalWrapper>
        </FocusTrap>
      </ModalOverlay>
    );

    const modalRoot = document.getElementById('modal-root')!;
    return createPortal(component, modalRoot);
  } else {
    return null;
  }
};

export default Modal;
