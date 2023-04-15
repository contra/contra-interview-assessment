import { css } from './common';
import { colors } from '../colors';
import { mediaQueries } from './mediaQueries';

export const getScrollBarCss = (
  color = colors.black40,
  background = colors.white
) => css`
  scrollbar-width: thin;
  scrollbar-color: ${color} ${background};
  /* width */
  ::-webkit-scrollbar {
    width: 5px;
    height: 5px;
  }

  /* Handle */
  ::-webkit-scrollbar-thumb {
    background-color: ${color};
    border-radius: 3px;
  }

  /* Track */
  ::-webkit-scrollbar-track {
    background: ${background};
  }

  /* Handle on hover */
  ::-webkit-scrollbar-thumb:hover {
    border-radius: 3px;
    background-color: ${color};
  }
`;

export const globalCss = {
  clickable: css`
    user-select: none;
    :hover {
      cursor: pointer;
      opacity: 0.8;
    }
  `,
  isDisabled: css`
    ${(p: { isDisabled: boolean }) =>
      p.isDisabled &&
      css`
        opacity: 0.5;
        pointer-events: none;
      `}
  `,
  zIndex: css`
    z-index: ${(p: { zIndex: number }) => p.zIndex};
  `,
  divider: css`
    height: 1px;
    width: 100%;
    background: ${(p) => colors.gray3};
  `,
  focusOutlineNone: css`
    :focus {
      outline: none;
    }
  `,
  selectNone: css`
    user-select: none;
  `,
  yscroll: css`
    overflow-y: scroll;
  `,
  rotate180: css`
    transform: rotate(180deg);
  `,
  forMobile: css`
    ${mediaQueries.desktop} {
      display: none !important;
    }
  `,
  forDesktop: css`
    ${mediaQueries.mobile} {
      display: none !important;
    }
  `,
  mcontainer: css`
    ${mediaQueries.mobile} {
      padding-left: 6%;
      padding-right: 6%;
    }
  `,
  appPaddingLeft: css`
    padding-left: 20px;
    ${mediaQueries.mobile} {
      padding-left: 0%;
    }
  `,
  appPaddingRight: css`
    padding-right: 20px;
    ${mediaQueries.mobile} {
      padding-right: 0%;
    }
  `,
  appPadding: css`
    padding: 0 20px;
    ${mediaQueries.mobile} {
      padding: 0%;
    }
  `,
  svgFill: css`
    svg {
      path {
        fill: ${(p: any) => p.svgFill};
      }
    }
  `,
  c: css`
    color: ${(p: any) => p.c};
  `,
  bg: css`
    background-color: ${(p: any) => p.bg};
  `,
  overflowHidden: css`
    overflow: hidden;
  `,
  scrollbarDark: css`
    ${getScrollBarCss()}
  `,
};
