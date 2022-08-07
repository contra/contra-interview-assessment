import { style, styleVariants } from '@vanilla-extract/css';
import { variables } from '@/theme.css';

const overlayStyle = style({
  alignItems: `center`,
  background: `rgba(0,0,0,0.1)`,
  display: `flex`,
  inset: 0,
  justifyContent: `center`,
  outline: `none`,
  overflow: `auto`,
  position: `fixed`,
  zIndex: 9_999,
});

export const overlayVariants = styleVariants({
  hidden: [overlayStyle, { display: `none` }],
  visible: [overlayStyle, { display: `flex` }],
});

export const modalWrapperStyle = style({
  '@media': {
    'screen and (min-width: 560px)': {
      padding: 0,
      width: `520px`,
    },
  },
  maxWidth: `calc(100vw - (${variables.spacing[3]} * 2))`,
  padding: variables.spacing[3],
  selectors: {
    [`${overlayVariants.visible}.active &`]: {
      transform: `scale(1)`,
    },
    [`${overlayVariants.visible}.inactive &`]: {
      transform: `scale(0.95)`,
    },
  },
  transform: `scale(1)`,
  transition: `transform 0.25s ease-in-out`,
  width: `100%`,
});

export const modalStyle = style({
  '@media': {
    'screen and (min-width: 560px)': {
      borderRadius: `2px`,
    },
  },
  background: variables.colors.white,
  backgroundClip: `padding-box`,
  boxShadow: `0 3px 6px -4px #0000001f, 0 6px 16px #00000014, 0 9px 28px 8px #0000000d`,
  display: `flex`,
  flexDirection: `column`,
  outline: `none`,
  width: `100%`,
});

export const headerStyle = style({
  background: variables.colors.white,
  borderBottom: `1px solid rgba(0,0,0,0.06)`,
  borderRadius: `2px 2px 0 0`,
  padding: `${variables.spacing[4]} 54px ${variables.spacing[4]} ${variables.spacing[6]}`,
  position: `relative`,
});

export const closeButtonStyle = style({
  ':focus': {
    color: variables.colors.slate[800],
  },
  ':hover': {
    color: variables.colors.slate[800],
    cursor: `pointer`,
  },
  alignItems: `center`,
  background: `none`,
  border: 0,
  bottom: 0,
  color: variables.colors.gray[300],
  display: `flex`,
  fontSize: variables.font.size['3xl'],
  justifyContent: `center`,
  padding: 0,
  position: `absolute`,
  right: 0,
  top: 0,
  transition: `color 0.3s ease-in-out`,
  width: `54px`,
});

export const bodyStyle = style({
  padding: variables.spacing[6],
});

export const footerStyle = style({
  alignItems: `center`,
  borderTop: `1px solid rgba(0,0,0,0.06)`,
  display: `flex`,
  gap: variables.spacing[2],
  justifyContent: `flex-end`,
  padding: `${variables.spacing['2.5']} ${variables.spacing[4]}`,
});
