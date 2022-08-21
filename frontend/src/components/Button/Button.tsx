import { styled } from '@/stitches';

const Button = styled('button', {
  '&:focus': { outline: '2px solid $primary500', outlineOffset: '2px' },
  borderRadius: '5px',
  fontWeight: 'bolder',
  margin: '10px auto',
  minWidth: '100px',
  padding: '5px 10px',
  variants: {
    variant: {
      primary: {
        '&:focus': { outline: `1px solid white` },
        '&:hover': { backgroundColor: '$primary400' },
        backgroundColor: '$primary500',
        color: '$grey100',
      },
      success: {
        '&:focus': { outline: `1px solid white` },
        '&:hover': { backgroundColor: '$success400' },
        backgroundColor: '$success500',
        color: '$grey100',
      },
    },
  },
});

export default Button;
