import { appCss } from './appCss';
import { mediaQueries, mediaQueryBreakpoints } from './appCss/mediaQueries';
import { colors } from './colors';

export const theme = {
  colors,
  css: appCss,
  mediaQueries,
  mediaQueryBreakpoints,
};

export type ThemeType = typeof theme;

export { colors } from './colors';
