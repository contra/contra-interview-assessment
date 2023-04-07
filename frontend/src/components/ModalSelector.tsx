import React from 'react';
import styled from 'styled-components';
import Button from './Button';

const ModalSelectorContainer = styled.div`
  display: flex;
  position: relative;
  gap: 20px;
  margin: 10px;

  @media (${({ theme: { device } }) => device.mobileAndTablet}) {
    flex-direction: column;
  }
`;

type ModalSelectorProps = {
  onSelectModal: (
    modalType:
      | boolean
      | 'Base'
      | 'Content'
      | 'Dialog'
      | 'Nested'
      | 'NestedChildren'
  ) => void;
  onSwitchTheme: () => void;
};
const ModalSelector: React.FC<ModalSelectorProps> = ({
  onSelectModal,
  onSwitchTheme,
}) => {
  return (
    <ModalSelectorContainer>
      <Button onClick={() => onSelectModal('Base')}>Open Base Modal</Button>
      <Button onClick={() => onSelectModal('Content')}>
        Open Content Modal
      </Button>
      <Button onClick={() => onSelectModal('Dialog')}>Open Dialog Modal</Button>
      <Button onClick={() => onSelectModal('Nested')}>
        Open Modal with Nested
      </Button>
      <Button onClick={() => onSwitchTheme()} variant="Secondary">
        Switch Theme
      </Button>
    </ModalSelectorContainer>
  );
};

export default ModalSelector;
