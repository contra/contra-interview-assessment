import { globalStyle, style } from '@vanilla-extract/css';
import { variables } from '@/theme.css';

export const wrapperStyle = style({
  border: `1px solid rgba(0,0,0,.06)`,
  borderRadius: `2px`,
  display: `block`,
  position: `relative`,
});

export const innerStyle = style({
  borderBottom: `1px solid rgba(0,0,0,.06)`,
  display: `block`,
  padding: `${variables.spacing[12]} 24px`,
});

export const infoWrapperStyle = style({
  borderRadius: `0 0 2px 2px`,
  position: `relative`,
});

export const infoTitleStyle = style({
  background: variables.colors.white,
  color: variables.colors.slate[700],
  fontSize: variables.font.size.sm,
  fontWeight: `bold`,
  marginLeft: variables.spacing[4],
  padding: `0 ${variables.spacing[2]}`,
  position: `absolute`,
  top: `-25px`,
});

export const infoDescriptionStyle = style({
  fontSize: variables.font.size.sm,
  lineHeight: variables.spacing[5],
  margin: 0,
  padding: `${variables.spacing[6]}`,
});

globalStyle(`${infoDescriptionStyle} code`, {
  background: variables.colors.sky[300],
  borderRadius: `2px`,
  padding: `0 ${variables.spacing[1]}`,
});
