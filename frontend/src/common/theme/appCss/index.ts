import { animations } from './animations';
import { debugCss } from './debugCss';
import { dimensionsCss } from './dimensionsCss';
import { fontCss } from './fontCss';
import { globalCss } from './globalCss';
import { layoutCss } from './layoutCss';
import { absolutePosition, marginCss, paddingCss } from './positionCss';
import { textCss } from './textCss';
import { textStyles } from './textStyles';

export const formatCssValue = (v: any) =>
  v + (typeof v === 'number' ? 'px' : '');

export const appCss = {
  ...animations,
  ...dimensionsCss,
  ...layoutCss,
  ...textCss,
  ...fontCss,
  ...debugCss,
  ...textStyles,
  ...globalCss,
  ...marginCss,
  ...absolutePosition,
  ...paddingCss,
};
