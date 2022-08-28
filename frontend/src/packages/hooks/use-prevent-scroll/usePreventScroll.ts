import { useLayoutEffect } from 'react';

/**
 * Prevents scrolling on the document root when consumer component mounts.
 * Sets `overflow: hidden` on the root element.
 * Updates root padding to prevent layout shifting when the scroll bar disappears.
 * When consumer unmounts, restores root to previous behavior.
 */
export function usePreventScroll() {
  useLayoutEffect(() => {
    const root = document.documentElement;

    const previousPaddingRight = root.style.paddingRight;
    const scrollBarWidth = window.innerWidth - root.clientWidth;
    root.style.paddingRight = `${scrollBarWidth}px`;

    const previousOverflow = root.style.overflow;
    root.style.overflow = 'hidden';

    return () => {
      root.style.overflow = previousOverflow;
      root.style.paddingRight = previousPaddingRight;
    };
  }, []);
}
