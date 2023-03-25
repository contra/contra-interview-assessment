import { useEffect, useRef } from 'react';

import { FOCUSABLE_HTML_ELEMENT_STR } from './common.const';

export const useEscapeKey = (handleAction: () => void) => {
  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        handleAction();
      }
    };

    document.addEventListener('keydown', handleEscape, false);
    return () => {
      document.removeEventListener('keydown', handleEscape, false);
    };
  }, [handleAction]);
};

export const useScrollBlock = (shouldBlock: boolean) => {
  useEffect(() => {
    if (shouldBlock) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }

    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [shouldBlock]);
};

export const useFocusTrap = () => {
  const refOuter = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    setTimeout(() => {
      const focusableElements = Array.from<HTMLElement>(
        refOuter.current?.querySelectorAll(FOCUSABLE_HTML_ELEMENT_STR) ?? []
      );

      const firstElement = focusableElements[0];
      const lastElement = focusableElements[focusableElements.length - 1];

      firstElement?.focus();

      const handleTabKey = (event: KeyboardEvent): void => {
        if (event.key !== 'Tab') {
          return;
        }

        if (
          document.activeElement === lastElement &&
          lastElement &&
          !event.shiftKey
        ) {
          event.preventDefault();
          firstElement?.focus();
        }

        if (
          document.activeElement === firstElement &&
          firstElement &&
          event.shiftKey
        ) {
          event.preventDefault();
          lastElement?.focus();
        }
      };

      document.addEventListener('keydown', handleTabKey);

      return () => document.removeEventListener('keydown', handleTabKey);
    }, 100);
  }, [refOuter]);

  return refOuter;
};
