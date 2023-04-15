import React from 'react';
import styled, { css } from 'styled-components';
import { HTMLButton, ButtonThemeCSSProps, Div } from './utils';

const ButtonTypes = [
  'primary',
  'secondaryPrimary',
  'secondary',
  'tertiary',
  'destructive',
] as const;
export type ButtonType = typeof ButtonTypes[number];

const isDisabledCss = css`
  border: none;
  color: ${(p) => p.theme.colors.black40};
  background: ${(props) => props.theme.colors.gray3};
  pointer-events: none;
`;

type Styles = {
  [K in ButtonType]?: any;
};
const styles: Styles = {
  primary: css`
    background: ${(props) => props.theme.colors.navy};
    color: ${(props) => props.theme.colors.white};
    :hover {
      background: ${(props) => props.theme.colors.navy60};
    }
    ${(p: any) => p.isDisabled && isDisabledCss}
  `,
  secondaryPrimary: css`
    background: ${(props) => props.theme.colors.white};
    border: solid 1px ${(props) => props.theme.colors.navy};
    color: ${(props) => props.theme.colors.navy};
    :hover {
      border: solid 1px transparent;
      background: ${(props) => props.theme.colors.navy60};
      color: ${(p) => p.theme.colors.white};
    }
    ${(p: any) => p.isDisabled && isDisabledCss}
  `,
  secondary: css`
    background: ${(props) => props.theme.colors.white};
    color: ${(props) => props.theme.colors.black80};
    border: solid 1px ${(p) => p.theme.colors.black20};
    :hover {
      border: solid 1px transparent;
    }
    ${(p: any) => p.isDisabled && isDisabledCss}
  `,
  tertiary: css`
    background: transparent;
    color: ${(props) => props.theme.colors.black60};
    border: none;
    ${(p: any) =>
      p.isDisabled &&
      css`
        ${isDisabledCss};
        background: transparent;
        color: ${(p) => p.theme.colors.black40};
      `}
    :hover {
      color: ${(p) => p.theme.colors.black80};
      background: ${(p) => p.theme.colors.gray2};
      box-shadow: none;
    }
  `,
  destructive: css`
    background: ${(p) => p.theme.colors.red};
    color: ${(props) => props.theme.colors.white};
    ${(p: any) => p.isDisabled && isDisabledCss}
  `,
};

type ButtonBaseProps = {
  variant?: ButtonType;
  isDisabled?: boolean;
};
export const ButtonBase = styled(HTMLButton)<ButtonBaseProps>`
  height: 44px;
  border-radius: 4px;
  border: solid 1px transparent;
  user-select: none;
  padding: 10px 12px;
  :hover {
    cursor: pointer;
    box-shadow: 0 4px 12px 0 rgba(0, 0, 0, 0.2);
  }
  :focus {
    /* outline: none; */
  }

  font-size: 16px;
  font-weight: 600;
  line-height: 23px;
  ${(p) => {
    const c = p.theme.css;
    return [c.centered];
  }};

  ${({ variant }) => styles[variant || 'primary']};
`;

type BtnProps = {
  onClick?: () => void;
  variant?: ButtonType;
  children: any;
  icon?: JSX.Element;
  isDisabled?: boolean;
} & ButtonThemeCSSProps;

export const Button = ({
  onClick = () => {},
  isDisabled = false,
  icon,
  variant = 'primary',
  children,
  type = 'button',
  ...props
}: BtnProps) => {
  return (
    <ButtonBase
      w100
      alignCenter
      type={type}
      tabIndex={0}
      onKeyDown={({ code }: { code: string }) => {
        if (code === 'Space' || (code === 'Enter' && onClick)) onClick();
      }}
      aria-disabled={isDisabled}
      aria-label={children}
      {...{ variant, isDisabled, onClick, ...props }}
    >
      {icon && (
        <Div mr={12} centered>
          {icon}
        </Div>
      )}
      {children}
    </ButtonBase>
  );
};
