/* eslint-disable canonical/sort-keys */
// Our keys show a progression of sizes from xs -> xl, they should be kept in this order.
import { createStitches } from '@stitches/react';

export const { styled } = createStitches({
  media: {
    // sizes courtesy of https://getbootstrap.com/docs/5.0/layout/breakpoints/
    sm: '(min-width: 576px)',
    md: '(min-width: 768px)',
    lg: '(min-width: 992px)',
    xl: '(min-width: 1200px)',
  },
});
