import React, { useState, useEffect, useRef } from "react";
import styled from 'styled-components'
import Image from "next/image";


interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

const ModalBackdrop = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ModalContainer = styled.div`
  position: relative;
  background-color: white;
  padding: 20px;
  border-radius: 4px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
  height: 500px;
  max-width: 700px;
  width: 100%;
`;

const ModalCloseButton = styled.button`
  position: absolute;
  bottom: 30px;
  left: 50%;
  transform: translateX(-50%); 
  border: none;
  background-color: transparent;
  font-size: 1.5rem;
  cursor: pointer;

  &:hover {
    color: red;
  }
`;

const ModalContent = styled.div`
  text-align: center;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  margin-top: 0px;
  font-family: "Arial", sans-serif;
`;

const NextImageContainer = styled.div`
  // background: red;
  display: flex;
  justify-content: center;
  align-items: center;
  padding-top: 40px
`

const StyledClosedImage = styled(Image)`

`

const StyledNextImage = styled(Image)`
  // border-radius: 50%;
  margin-top: 50px;
  
`;


const Modal: React.FC<ModalProps> = ({ isOpen, onClose, children }) => {
  const modalRef = useRef<HTMLDivElement>(null);
  const [tabbableElements, setTabbableElements] = useState<NodeListOf<HTMLElement>>();
  const [previouslyFocusedElement, setPreviouslyFocusedElement] = useState<HTMLElement>();

  useEffect(() => {
    if (isOpen) {
      setPreviouslyFocusedElement(document.activeElement as HTMLElement);

      const tabbable = modalRef.current?.querySelectorAll<HTMLElement>(
        "button, [href], input, select, textarea, [tabindex]:not([tabindex='-1'])"
      );
      setTabbableElements(tabbable);

      const firstTabbable = tabbable?.[0];
      firstTabbable?.focus();

      document.body.style.overflow = "hidden";
    } else {
      setTabbableElements(undefined);
      setPreviouslyFocusedElement(undefined);
      document.body.style.overflow = "";
    }
  }, [isOpen]);

  const handleKeyDown = (event: React.KeyboardEvent) => {
    const lastTabbable = tabbableElements?.[tabbableElements.length - 1];
    const firstTabbable = tabbableElements?.[0];

    if (event.key === "Tab" && !event.shiftKey && document.activeElement === lastTabbable) {
      event.preventDefault();
      firstTabbable?.focus();
    } else if (event.key === "Tab" && event.shiftKey && document.activeElement === firstTabbable) {
      event.preventDefault();
      lastTabbable?.focus();
    } else if (event.key === "Escape") {
      onClose();
    }
  };

  const handleClick = (event: React.MouseEvent<HTMLDivElement>) => {
    if (event.target === modalRef.current) {
      onClose();
    }
  };

  return isOpen ? (
    <ModalBackdrop className="modal-backdrop" onClick={handleClick} ref={modalRef} onKeyDown={handleKeyDown} tabIndex={-1}>
      <ModalContainer className="modal">
        <NextImageContainer>
          <StyledNextImage src="/assets/png/check.png" width={80} height={80} alt="Example Image" />
        </NextImageContainer>
        <ModalContent>{children}</ModalContent>
        <ModalCloseButton className="modal-close" onClick={onClose}>
          Close
        </ModalCloseButton>
      </ModalContainer>
    </ModalBackdrop>
  ) : null;
};

export default Modal;
