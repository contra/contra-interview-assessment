/* eslint-disable canonical/sort-keys */
import Button from '@/components/Button/Button';
import { keyframes, styled } from '@/stitches';

const contentShowAnimation = keyframes({
  '0%': { opacity: 0, transform: 'translate(-50%, -48%) scale(.96)' },
  '100%': { opacity: 1, transform: 'translate(-50%, -50%) scale(1)' },
});

export const InternalStyledModalContent = styled('div', {
  maxHeight: '95vh',
  borderRadius: '6px',
  boxShadow: `rgba(14, 18, 22, 0.35) 0px 10px 38px -10px,
    rgba(14, 18, 22, 0.2) 0px 10px 20px -15px;`,
  backgroundColor: '$grey900',
  border: '1px solid $primary500',
  left: '50%',
  overflow: 'auto',
  padding: 10,
  position: 'fixed',
  top: '50%',
  maxWidth: '95vw',
  transform: 'translate(-50%, -50%)',
  '@media (prefers-reduced-motion: no-preference)': {
    animation: `${contentShowAnimation} 200ms cubic-bezier(0.16, 1, 0.3, 1)`,
  },
  '@media only screen and (max-width: 600px)': {
    width: '480px',
  },
  '@media only screen and (min-width: 600px)': {
    width: '640px',
  },
  '@media only screen and (min-width: 768px)': {
    width: '800px',
  },
  '@media only screen and (min-width: 992px)': {
    width: '1064px',
  },
  '@media only screen and (min-width: 1200px)': {
    width: '1200px',
  },
});

const overlayShowAnimation = keyframes({
  '0%': { opacity: 0 },
  '100%': { opacity: 1 },
});

export const InternalStyledModalOverlay = styled('span', {
  '@media (prefers-reduced-motion: no-preference)': {
    animation: `${overlayShowAnimation} 200ms cubic-bezier(0.16, 1, 0.3, 1)`,
  },
  backgroundColor: 'rgba(0, 0, 0, 0.44)',
  inset: 0,
  position: 'fixed',
});

export const InternalStyledModalClose = styled(Button, {
  fontWeight: 500,
  variants: {
    shouldBeAtTopRight: {
      true: {
        position: 'absolute',
        top: 10,
        right: 10,
      },
    },
  },
});

export const InternalStyledModalTitle = styled('h2', {});

export const InternalStyledModalDescription = styled('p', {});
