import { css } from './common';
import { formatCssValue } from './index';

export const absolutePosition = {
  top: css`
    top: ${(p: any) => formatCssValue(p.top)};
  `,
  bottom: css`
    bottom: ${(p: any) => formatCssValue(p.bottom)};
  `,
  left: css`
    left: ${(p: any) => formatCssValue(p.left)};
  `,
  right: css`
    right: ${(p: any) => formatCssValue(p.right)};
  `,
};

export const marginCss = {
  mt: css`
    margin-top: ${(p: any) => formatCssValue(p.mt)};
  `,
  mb: css`
    margin-bottom: ${(p: any) => formatCssValue(p.mb)};
  `,
  ml: css`
    margin-left: ${(p: any) => formatCssValue(p.ml)};
  `,
  mr: css`
    margin-right: ${(p: any) => formatCssValue(p.mr)};
  `,
  m: css`
    margin: ${(p: any) => formatCssValue(p.m)};
  `,
};

export const paddingCss = {
  pt: css`
    padding-top: ${(p: any) => formatCssValue(p.pt)};
  `,
  pb: css`
    padding-bottom: ${(p: any) => formatCssValue(p.pb)};
  `,
  pl: css`
    padding-left: ${(p: any) => formatCssValue(p.pl)};
  `,
  pr: css`
    padding-right: ${(p: any) => formatCssValue(p.pr)};
  `,
  p: css`
    padding: ${(p: any) => formatCssValue(p.p)};
  `,
};
