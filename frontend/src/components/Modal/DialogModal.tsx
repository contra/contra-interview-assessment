import React from 'react';
import styled from 'styled-components';
import Button from '../Button';
import ContentModal, { type ContentModalProps } from './ContentModal';

type Props = ContentModalProps & {
  cancelLabel: string;
  confirmLabel: string;
  onClickCancel: () => void;
  onClickConfirm: () => void;
  text: string;
  title: string;
};

const ButtonsContainer = styled.div`
  display: flex;
  gap: 16px;
  margin-top: 24px;
  justify-content: flex-end;
`;

const DialogModal: React.FC<Props> = ({
  cancelLabel,
  confirmLabel,
  onClickCancel,
  onClickConfirm,
  ...modalProps
}) => {
  return (
    <ContentModal {...modalProps}>
      <ButtonsContainer>
        <Button onClick={onClickCancel}>{cancelLabel}</Button>
        <Button onClick={onClickConfirm} variant="Secondary">
          {confirmLabel}
        </Button>
      </ButtonsContainer>
    </ContentModal>
  );
};

export default DialogModal;
