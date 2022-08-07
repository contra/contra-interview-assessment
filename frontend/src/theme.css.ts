import { createGlobalTheme } from '@vanilla-extract/css';

export const variables = createGlobalTheme(':root', {
  colors: {
    gray: {
      50: `#f9fafb`,
      100: `#f3f4f6`,
      200: `#e5e7eb`,
      300: `#d1d5db`,
      400: `#9ca3af`,
      500: `#6b7280`,
      600: `#4b5563`,
      700: `#374151`,
      800: `#1f2937`,
      900: `#111827`,
    },
    sky: {
      50: `#f0f9ff`,
      100: `#e0f2fe`,
      200: `#bae6fd`,
      300: `#7dd3fc`,
      400: `#38bdf8`,
      500: `#0ea5e9`,
      600: `#0284c7`,
      700: `#0369a1`,
      800: `#075985`,
      900: `#0c4a6e`,
    },
    slate: {
      50: `#f8fafc`,
      100: `#f1f5f9`,
      200: `#e2e8f0`,
      300: `#cbd5e1`,
      400: `#94a3b8`,
      500: `#64748b`,
      600: `#475569`,
      700: `#334155`,
      800: `#1e293b`,
      900: `#0f172a`,
    },
    white: `#fff`,
  },
  font: {
    family: {
      inter: '"Inter", sans-serif',
    },
    size: {
      '2xl': `1.5rem`,
      '3xl': `1.875rem`,
      '4xl': `2.25rem`,
      base: `1rem`,
      lg: `1.125rem`,
      sm: `0.875rem`,
      xl: `1.25rem`,
      xs: `0.75rem`,
    },
  },
  spacing: {
    0: `1px`,
    /* 2px */
    '0.5': `0.125rem`,
    /* 4px */
    1: `0.25rem`,
    /* 6px */
    '1.5': `0.375rem`,
    /* 8px */
    2: `0.5rem`,
    /* 10px */
    '2.5': `0.625rem`,
    /* 12px */
    3: `0.75rem`,
    /* 14px */
    '3.5': `0.875rem`,
    /* 16px */
    4: `1rem`,
    /* 20px */
    5: `1.25rem`,
    /* 24px */
    6: `1.55rem`,
    7: `1.75rem`,
    8: `2rem`,
    9: `2.25rem`,
    10: `2.5rem`,
    11: `2.75rem`,
    12: `3rem`,
  },
});
