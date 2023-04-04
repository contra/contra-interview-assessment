import styled from 'styled-components';

type ModalContentProps = {
  size: number;
  tabIndex: number;
};

type ModalContainerProps = {
  hasOverlay: boolean;
};

export const ModalContainer = styled.div<ModalContainerProps>`
  position: fixed;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease-in-out;

  ${({ hasOverlay }) =>
    hasOverlay &&
    `
      background-color: rgba(0, 0, 0, 0.5);
  }
  `}
`;

export const ModalContent = styled.section<ModalContentProps>`
  width: ${(props) => `${props.size}vw`};
  height: ${(props) => `${props.size + 10}vh`};
  background-color: #fff;
  display: flex;
  flex-direction: column;
  border-radius: 0.5rem;
  border: 1px solid rgba(0, 0, 0, 0.175);
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1),
    0 4px 6px -2px rgba(0, 0, 0, 0.05);

  @media (max-height: 768px) {
    height: ${(props) => `${props.size + 40}vh`};
    min-height: 250px;
  }

  @media (max-width: 968px) {
    width: ${(props) => `${props.size + 40}vw`};
  }

  @media (max-width: 768px) {
    width: 100vw;
    height: 100vh;
  }
`;

export const ModalBody = styled.div`
  flex: 1;
  overflow: auto;
  border-top: 1px solid #eee;
  border-bottom: 1px solid #eee;
  padding: 1rem 1.5rem;
`;

export const ModalHeader = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 1.5rem;
  font-size: 1.25rem;
  font-weight: 600;
`;

export const IconButton = styled.button`
  border: none;
  background: none;
  cursor: pointer;
  color: #8a8a8a;
  padding: 0;
  font-size: 1.25rem;
  appearance: none;

  &:hover {
    opacity: 0.8;
  }
`;

export const ModalFooter = styled.footer`
  padding: 1rem 1.5rem;
`;
