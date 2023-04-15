import React from 'react';
import styled from 'styled-components';
import { appCss } from '../theme/appCss';

export const propsToThemeCSS = (props: any) =>
  Object.keys(props)
    .map((p) => props.theme.css[p])
    .filter((c) => c);

export type ThemeCSSProps =
  | {
      [K in keyof typeof appCss]?: any;
    }
  | { name: string; key: string };

export const Div = styled.div<ThemeCSSProps>(propsToThemeCSS);
export const H1 = styled.h1<ThemeCSSProps>(propsToThemeCSS);
export const P = styled.p<ThemeCSSProps>(propsToThemeCSS);

export const HTMLButton = styled.button<ThemeCSSProps>(propsToThemeCSS);
export type HTMLButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement>;
export type ButtonThemeCSSProps = HTMLButtonProps & ThemeCSSProps;

export * from './hooks';
