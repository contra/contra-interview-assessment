import { useCallback, useEffect } from 'react';

export const useEscapeKeyPressed = (closeModal: () => void) => {
  const close = useCallback(
    (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        closeModal();
      }
    },
    [closeModal]
  );

  useEffect(() => {
    window.addEventListener('keydown', close, false);
    return () => window.removeEventListener('keydown', close, false);
  }, [close]);
};
