import { css } from './common'

export const fontCss = {
  lite: css`
    font-weight: 300;
  `,
  semiBold: css`
    font-weight: 500;
  `,
  bold: css`
    font-weight: 600;
  `,
  extraBold: css`
    font-weight: 700;
  `,
  fontweight_800: css`
    font-weight: 800;
  `,
  italic: css`
    font-style: italic;
  `,
  fs: css`
    /* font size in px */
    font-size: ${(props: any) => props._fs}px;
  `,
  lh: css`
    /* line height in px */
    line-height: ${(props: any) => props._lh}px;
  `,
  ls: css`
    /* letter spacing in px */
    letter-spacing: ${(props: any) => props._ls}px;
  `,
}
