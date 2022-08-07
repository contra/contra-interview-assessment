import { style } from '@vanilla-extract/css';
import { variables } from '@/theme.css';

export const wrapperStyle = style({
  margin: `auto`,
  maxWidth: `1024px`,
  padding: `0 ${variables.spacing[9]} ${variables.spacing[12]} ${variables.spacing[9]}`,
});

export const exampleBoxWrapper = style({
  display: `flex`,
  flexDirection: `column`,
  gap: variables.spacing[9],
});
