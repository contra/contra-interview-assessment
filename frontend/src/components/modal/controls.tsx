import { forwardRef, createRef } from 'react';
import styled from 'styled-components';
import ModalToggleButton from './toggle-button';

const ControlsContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  margin-top: 1.5em;

  & > button + button {
    margin-left: 0.5em;
  }
`;

const Controls = forwardRef(
  ({ id, title, showFooterClose, closeModal, children }, ref) => {
    const closeBtnRef = createRef();

    return (
      <ControlsContainer>
        {children}

        {showFooterClose && (
          <ModalToggleButton
            ref={closeBtnRef}
            id={`modal-footer-close-${id}`}
            label={`Close ${title} Modal`}
            handleToggle={(e) => closeModal(e, ref)}
            modalRef={ref}
            targetModal={`modal-${id}`}
            size="sm"
          >
            Close
          </ModalToggleButton>
        )}
      </ControlsContainer>
    );
  }
);

export default Controls;
