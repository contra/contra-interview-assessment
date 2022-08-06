import { globalStyle } from '@vanilla-extract/css';
import { variables } from './theme.css';

globalStyle('*, *::before, *::after', {
  boxSizing: `border-box`,
});

globalStyle('body', {
  fontFamily: variables.font.family.inter,
  fontSize: variables.font.size.base,
  margin: 0,
  padding: 0,
});
