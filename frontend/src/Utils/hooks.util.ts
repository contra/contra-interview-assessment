import { useEffect } from 'react';

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
