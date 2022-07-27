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
  isLoading?: boolean;
  onClickHandler?: () => void;
}

export function Button({
  label,
  isCancel,
  isDestructive,
  isLoading,
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
      <DestructiveButton onClick={onClickHandler} disabled={isLoading}>
        {isLoading && <Loading />}
        <ButtonText>{label}</ButtonText>
      </DestructiveButton>
    );
  }

  return (
    <DefaultButton onClick={onClickHandler} disabled={isLoading}>
      {isLoading && <Loading />}
      <ButtonText>{label}</ButtonText>
    </DefaultButton>
  );
}

const Loading = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      x=""
      y="0"
      width={50}
      version="1.1"
      viewBox="0 0 100 100"
      xmlSpace="preserve"
    >
      <path
        fill="currentColor"
        d="M73 50c0-12.7-10.3-23-23-23S27 37.3 27 50m3.9 0c0-10.5 8.5-19.1 19.1-19.1S69.1 39.5 69.1 50"
      >
        <animateTransform
          attributeName="transform"
          attributeType="XML"
          dur="1s"
          from="0 50 50"
          repeatCount="indefinite"
          to="360 50 50"
          type="rotate"
        ></animateTransform>
      </path>
    </svg>
  );
};
