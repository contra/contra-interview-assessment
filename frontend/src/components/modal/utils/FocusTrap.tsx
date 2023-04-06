import { useEffect, type ReactNode } from 'react';

const focusableElements =
  'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])';
const getFocusableElementInfo = (element: HTMLElement) => {
  const focusableContent = element.querySelectorAll(focusableElements);
  return {
    first: focusableContent[0] as HTMLElement | undefined,
    last: focusableContent[focusableContent.length - 1] as
      | HTMLElement
      | undefined,
  };
};

export type FocusTrapProps = {
  children: ReactNode;
  element: HTMLElement | null;
};

// Adapted from https://uxdesign.cc/how-to-trap-focus-inside-modal-to-make-it-ada-compliant-6a50f9a70700
export const FocusTrap = (props: FocusTrapProps) => {
  const { children, element } = props;

  useEffect(() => {
    if (element === null) {
      return () => {};
    }

    const tabHandler = (event: KeyboardEvent) => {
      if (event.key !== 'Tab') {
        return;
      }

      const focusableElementInfo = getFocusableElementInfo(element);

      // On Shift+Tab, if we're in the first element, wrap focus into the last element
      if (event.shiftKey) {
        if (document.activeElement === focusableElementInfo.first) {
          focusableElementInfo.last?.focus();
          event.preventDefault();
        }
        // On Tab, if we're in the last element, wrap focus back into the first element
      } else if (document.activeElement === focusableElementInfo.last) {
        focusableElementInfo.first?.focus();
        event.preventDefault();
      }
      // Otherwise, we're just tabbing somewhere in the middle and it's OK to proceed
    };

    document.addEventListener('keydown', tabHandler);

    return () => {
      document.removeEventListener('keydown', tabHandler);
    };
  }, [element]);

  return <>{children}</>;
};
