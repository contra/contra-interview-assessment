import { globalCss } from '@/stitches';

export const globalStyles = globalCss({
  '#root,#__next': { isolation: 'isolate' },
  '*': {
    margin: 0,
  },
  '*, *::before, *::after': {
    boxSizing: 'border-box',
    fontFamily: 'Nunito, sans-serif',
  },
  '*::-webkit-scrollbar': {
    height: '5px',
    width: '5px',
  },
  '*::-webkit-scrollbar-thumb': {
    backgroundColor: '$primary500',
    borderRadius: '1rem',
  },
  '*::-webkit-scrollbar-track': {},
  body: {
    backgroundColor: '$grey900',
    color: '$grey100',
    lineHeight: '2',
    WebkitFontSmoothing: 'antialiased',
  },
  code: {
    border: `2px solid $grey400`,
    borderRadius: '0.3rem',
    margin: '0rem 0.3rem',
    padding: '0.1rem 0.3rem',
  },
  html: {
    height: '100%',
  },
  'img, picture, video, canvas, svg': { display: 'block', maxWidth: '100%' },
  'input, button, textarea, selectinput, button, textarea, select': {
    font: 'inherit',
  },
  'p, h1, h2, h3, h4, h5, h6': { overflowWrap: 'break-word' },
});
