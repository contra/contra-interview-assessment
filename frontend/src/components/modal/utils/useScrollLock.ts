import { useEffect } from 'react';

export const useScrollLock = () => {
  useEffect(() => {
    const latestBodyOverflowValue = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = latestBodyOverflowValue;
    };
  }, []);
};
