import { styled } from '@/stitches';

export const Container = styled('div', {
  '@media only screen and (min-width: 600px)': {
    maxWidth: '640px',
  },
  display: 'block',
  margin: '0px auto',
  padding: '0px 1.5rem',
  width: '100%',
});
