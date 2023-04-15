import { css } from './common'

export const textCss = {
  truncateText: css`
    overflow: hidden;
    word-wrap: break-word;
    overflow-wrap: break-word;
    display: -webkit-box;
    -webkit-line-clamp: 1;
    -webkit-box-orient: vertical;
    -webkit-hyphens: auto;
    -moz-hyphens: auto;
    hyphens: auto;
  `,
  dInline: css`
    display: inline-block;
  `,
  flexWrap: css`
    display: flex;
    flex-wrap: wrap;
  `,
  underline: css`
    text-decoration: underline;
  `,
  textAlignCenter: css`
    text-align: center;
  `,
  uppercase: css`
    text-transform: uppercase;
  `,
  capitalize: css`
    text-transform: capitalize;
  `,
  lowercase: css`
    text-transform: lowercase;
  `,
}
