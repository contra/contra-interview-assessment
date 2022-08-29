import { useEffect, useState } from 'react';

export enum EMediaBreakPoint {
  desktop = '(min-width: 960px)',
  mobile = '(max-width: 600px)',
  tablet = '(min-width: 768px) ',
}

export const useMediaQuery = (query: EMediaBreakPoint): boolean => {
  const getMatches = (): boolean => {
    // Prevents SSR issues
    if (typeof window !== 'undefined') {
      return window.matchMedia(query).matches;
    }

    return false;
  };

  const [matches, setMatches] = useState<boolean>(getMatches());

  const handleChange = () => {
    setMatches(getMatches());
  };

  useEffect(() => {
    const matchMedia = window.matchMedia(query);

    handleChange();

    matchMedia.addEventListener('change', handleChange);

    return () => {
      matchMedia.removeEventListener('change', handleChange);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [query]);

  return matches;
};
