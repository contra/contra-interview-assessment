import { FOCUSABLE_HTML_ELEMENT } from './common.const';
import { useEffect, useMemo } from 'react';

export const useEscapeKey = (handleAction: () => void) => {
  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        handleAction();
      }
    };

    document.addEventListener('keydown', handleEscape);

    return () => {
      document.removeEventListener('keydown', handleEscape);
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

export const useFocus = (
  escAction: () => void,
  ref: React.RefObject<HTMLDivElement>
) => {
  const focusableModalElements = useMemo(() => {
    return (
      ref.current?.querySelectorAll<HTMLElement>(
        FOCUSABLE_HTML_ELEMENT.join(', ')
      ) ?? []
    );
  }, [ref]);

  useEffect(() => {
    const handleTabKey = (event: KeyboardEvent): void => {
      if (focusableModalElements) {
        const firstElement = focusableModalElements[0];
        const lastElement =
          focusableModalElements[focusableModalElements.length - 1];

        if (
          !event.shiftKey &&
          document.activeElement !== firstElement &&
          firstElement
        ) {
          firstElement.focus();
          event.preventDefault();
        }

        if (event.shiftKey && document.activeElement !== lastElement) {
          lastElement?.focus();
          event.preventDefault();
        }
      }
    };

    const keyListenersMap = new Map([
      ['Escape', escAction],
      ['Tab', handleTabKey],
    ]);
    const keyListener = (event: KeyboardEvent): void => {
      const listener = keyListenersMap.get(event.key);
      return listener && listener(event);
    };

    document.addEventListener('keydown', keyListener);

    return () => document.removeEventListener('keydown', keyListener);
  }, [escAction, focusableModalElements]);
};
