import React from 'react';
import {
  CancelButton,
  DefaultButton,
  ButtonText,
  DestructiveButton,
} from './Button.styles';

interface ButtonProps {
  label: string;
  isCancel?: boolean;
  isDestructive?: boolean;
  onClickHandler?: () => void;
}

export function Button({
  label,
  isCancel,
  isDestructive,
  onClickHandler,
}: ButtonProps) {
  if (isCancel) {
    return (
      <CancelButton onClick={onClickHandler}>
        <ButtonText>{label}</ButtonText>
      </CancelButton>
    );
  }

  if (isDestructive) {
    return (
      <DestructiveButton onClick={onClickHandler}>
        <ButtonText>{label}</ButtonText>
      </DestructiveButton>
    );
  }

  return (
    <DefaultButton onClick={onClickHandler}>
      <ButtonText>{label}</ButtonText>
    </DefaultButton>
  );
}
