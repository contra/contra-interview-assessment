import { useContext, useEffect, useState } from 'react';
import { ThemeContext } from 'styled-components';

export const useCloseOnEscapeKeyDown = (
  onClose: () => void,
  shouldCloseOnEscshouldCapeKeyDown: boolean
) => {
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose();
    };

    if (shouldCloseOnEscshouldCapeKeyDown)
      window.addEventListener('keydown', handleKeyDown);
    else window.removeEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [onClose, shouldCloseOnEscshouldCapeKeyDown]);
};

export const useOverlay = (isOpen: boolean, isStacked: boolean) => {
  useEffect(() => {
    if (isStacked) return;
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else document.body.style.overflow = 'auto';
  }, [isOpen]);

  useEffect(() => {
    return () => {
      if (isStacked) return;
      document.body.style.overflow = 'auto';
    };
  }, []);
};

export function useMediaQuery(query: string) {
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    const media = window.matchMedia(query);
    if (media.matches !== matches) {
      setMatches(media.matches);
    }
    const listener = () => {
      setMatches(media.matches);
    };
    media.addEventListener('change', listener);
    return () => media.removeEventListener('change', listener);
  }, [matches, query]);

  return matches;
}

export const useIsMobile = () => {
  const {
    mediaQueryBreakpoints: { mobile },
  } = useContext(ThemeContext);
  return useMediaQuery(mobile);
};
