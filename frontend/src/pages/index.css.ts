import { style } from '@vanilla-extract/css';
import { variables } from '@/theme.css';

export const wrapperStyle = style({
  margin: `auto`,
  maxWidth: `1024px`,
  padding: `0 ${variables.spacing[9]}`,
});
