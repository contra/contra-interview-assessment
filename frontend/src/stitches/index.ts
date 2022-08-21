import { createStitches } from '@stitches/react';
import { colors } from '@/theme';

export const { styled, css, getCssText, globalCss, keyframes } = createStitches(
  {
    theme: { colors },
  }
);
