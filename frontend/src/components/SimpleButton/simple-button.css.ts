import { createVar, fallbackVar } from '@vanilla-extract/css';
import { recipe } from '@vanilla-extract/recipes';
import { variables } from '@/theme.css';

const borderColorVariable = createVar();

export const button = recipe({
  base: {
    ':active': {
      boxShadow: `none`,
    },
    border: `1px solid ${fallbackVar(borderColorVariable, 'transparent')}`,
    borderRadius: `2px`,
    boxShadow: `0 2px rgba(0,0,0,0.05)`,
    cursor: `pointer`,
    display: `inline-block`,
    fontSize: variables.font.size.sm,
    minHeight: `32px`,
    padding: `${variables.spacing[1]} ${variables.spacing[4]}`,
    position: `relative`,
    textAlign: `center`,
    textShadow: `0 -1px 0 rgba(0, 0, 0, 0.12)`,
    touchAction: `manipulation`,
    transitionDuration: `0.25s`,
    transitionProperty: `background, color, border-color, box-shadow`,
    transitionTimingFunction: `ease-in-out`,
    userSelect: `none`,
    whiteSpace: `nowrap`,
  },
  variants: {
    type: {
      default: {
        background: variables.colors.white,
        color: variables.colors.slate[700],
        selectors: {
          '&:hover, &:focus': {
            color: variables.colors.sky[500],
            vars: {
              [borderColorVariable]: variables.colors.sky[500],
            },
          },
          // eslint-disable-next-line canonical/sort-keys
          '&:active': {
            color: variables.colors.sky[700],
            vars: {
              [borderColorVariable]: variables.colors.sky[700],
            },
          },
        },
        vars: {
          [borderColorVariable]: variables.colors.gray[300],
        },
      },
      primary: {
        background: variables.colors.sky[600],
        color: variables.colors.white,
        selectors: {
          '&:hover, &:focus': {
            background: variables.colors.sky[500],
            vars: {
              [borderColorVariable]: variables.colors.sky[500],
            },
          },
          // eslint-disable-next-line canonical/sort-keys
          '&:active': {
            background: variables.colors.sky[700],
            vars: {
              [borderColorVariable]: variables.colors.sky[700],
            },
          },
        },
        vars: {
          [borderColorVariable]: variables.colors.sky[600],
        },
      },
    },
  },
});
