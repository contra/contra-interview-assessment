import { useCallback, useEffect, useRef } from 'react';

const FOCUSABLE_ELEMENTS = [
  'a[href]',
  'area[href]',
  'input',
  'select',
  'textarea',
  'button',
  'iframe',
  'object',
  'embed',
  '*[tabindex]',
  '*[contenteditable]',
];
const FOCUSABLE_ELEMENTS_SELECTOR = FOCUSABLE_ELEMENTS.join(
  ':not([hidden]):not([disabled]),'
);

/**
 * Creates a focus scope that traps focus inside the given element.
 * When the scope is unmounted, the focus is restored to the element that was previously focused.
 *
 * @returns Function to create the focus scope. The function takes a ref to the scope container element.
 */
export function useFocusScope() {
  const previousFocusedElement = useRef(document.activeElement as HTMLElement);
  const scopeContainerRef = useRef<HTMLElement>();

  const tabKeyHandler = useCallback((event: KeyboardEvent) => {
    if (event.key !== 'Tab' || !scopeContainerRef.current) return;
    event.preventDefault();

    const focusableElements = Array.from<HTMLElement>(
      scopeContainerRef.current.querySelectorAll(FOCUSABLE_ELEMENTS_SELECTOR)
    ).filter((element) => element.tabIndex >= 0);

    const focusedIndex = focusableElements.indexOf(
      document.activeElement as HTMLElement
    );

    const nextFocusElement = event.shiftKey
      ? focusableElements.at(focusedIndex - 1) ?? focusableElements.at(-1)
      : focusableElements.at(focusedIndex + 1) ?? focusableElements.at(0);

    nextFocusElement?.focus();
  }, []);

  const setRef = useCallback(
    (node: HTMLElement | null) => {
      if (!node) return;
      document.addEventListener('keydown', tabKeyHandler, false);
      scopeContainerRef.current = node;
    },
    [tabKeyHandler]
  );

  useEffect(() => () => {
    previousFocusedElement.current.focus();
    document.removeEventListener('keydown', tabKeyHandler);
  });

  return { createFocusScope: setRef };
}
