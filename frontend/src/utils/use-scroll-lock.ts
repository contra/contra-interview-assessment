import { useEffect } from 'react';

export const useScrollLock = (open: boolean) => {
  useEffect(() => {
    if (open) document.body.style.overflow = 'hidden';
    else document.body.style.overflow = '';

    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);
};
