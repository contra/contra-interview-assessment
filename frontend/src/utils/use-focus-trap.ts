import { useEffect, useMemo, useState } from 'react';
import { useIsomorphicLayoutEffect } from './use-isomorphic-layout';

const TAB_KEYCODE = 9;

const FOCUSABLE_SELECTORS = [
  'a[href]',
  'area[href]',
  'input',
  'select',
  'textarea',
  'button',
  'iframe',
  'object',
  'details',
  'embed',
  '[contenteditable]',
  '[tabindex]:not([tabindex^="-"])',
] as const;

const FILTERS = ['disabled', 'aria-hidden'] as const;

export const useFocusTrap = <T extends HTMLElement>() => {
  // utilizing https://legacy.reactjs.org/docs/refs-and-the-dom.html#callback-refs
  // there's probably a better stateway focus to manage all modals, might bring in a state library for handling heavy modals
  const [state, setState] = useState<HTMLDivElement | null>(null);
  const focusableElements = useMemo(() => {
    const elements =
      state?.querySelectorAll<T>(FOCUSABLE_SELECTORS.join(', ')) ?? [];

    return Array.from(elements).filter((element) =>
      FILTERS.some((filter) => !element.getAttribute(filter))
    );
  }, [state]);

  useEffect(() => {
    const handleFocus = (event: KeyboardEvent) => {
      const firstFocusableElement = focusableElements[0];
      const lastFocusableElement =
        focusableElements[focusableElements.length - 1];
      const tabPressed = event.key === 'Tab' || event.keyCode === TAB_KEYCODE;

      if (!tabPressed) {
        return;
      }

      if (event.shiftKey) {
        if (document.activeElement === firstFocusableElement) {
          lastFocusableElement?.focus();
          event.preventDefault();
        }
      } else if (document.activeElement === lastFocusableElement) {
        firstFocusableElement?.focus();
        event.preventDefault();
      }
    };

    state?.addEventListener('keydown', handleFocus);
    return () => state?.addEventListener('keydown', handleFocus);
  }, [state, focusableElements]);

  useIsomorphicLayoutEffect(() => {
    if (
      !state?.contains(document.activeElement) &&
      document.activeElement !== state
    ) {
      // How does this handle for multiple windows
      focusableElements[0]?.focus();
    }
  }, [focusableElements]);

  return setState;
};
