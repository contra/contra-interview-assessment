/* eslint-disable canonical/filename-match-exported */
import styled from 'styled-components';

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(54, 54, 54, 0.75);
  height: 100vh;
  width: 100vw;

  &.hidden {
    display: none;
  }
`;

const ModalOverlay = ({ isOpen }) => {
  return <Overlay aria-hidden="true" className={!isOpen ? 'hidden' : ''} />;
};

export default ModalOverlay;
