import { useRef, useEffect, useMemo, useCallback } from 'react';

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
  const ref = useRef<T | null>(null);
  const focusableElements = useMemo(() => {
    const elements =
      ref.current?.querySelectorAll<HTMLElement>(
        FOCUSABLE_SELECTORS.join(', ')
      ) ?? [];
    return Array.from(elements).filter((element) =>
      FILTERS.some((filter) => !element.getAttribute(filter))
    );
  }, []);

  const handleFocus = useCallback(
    (event: KeyboardEvent) => {
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
    },
    [focusableElements]
  );

  useEffect(() => {
    const node = ref.current;
    node?.addEventListener('keydown', handleFocus);
    return () => node?.addEventListener('keydown', handleFocus);
  }, [handleFocus]);

  return ref;
};
