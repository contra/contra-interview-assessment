import React from 'react';
import styled from 'styled-components';

type Variant = 'Primary' | 'Secondary';
type ButtonProps = {
  children: React.ReactNode;
  onClick: () => void;
  variant?: Variant;
};

const ButtonContainer = styled.button<{ variant: Variant }>`
  padding: 14px 40px;
  border: none;
  cursor: pointer;
  font-size: ${({ theme: { fontSize } }) => fontSize.small};
  border-radius: ${({ theme: { radius } }) => radius.regular};

  background: ${({ theme: { colors }, variant }) =>
    variant === 'Primary' ? colors.white : colors.darkGrey};
  border: 1px solid
    ${({ theme: { colors }, variant }) =>
      variant === 'Primary' ? colors.darkGrey : colors.white};

  color: ${({ theme: { colors }, variant }) =>
    variant === 'Primary' ? colors.darkGrey : colors.white};

  &:focus {
    outline: none;
    box-shadow: ${({ theme: { shadow } }) => shadow.focus};
  }
`;

const Button: React.FC<ButtonProps> = ({
  children,
  onClick,
  variant = 'Primary',
}) => {
  return (
    <ButtonContainer onClick={onClick} variant={variant}>
      {children}
    </ButtonContainer>
  );
};

export default Button;
