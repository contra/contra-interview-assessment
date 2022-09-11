import { useEffect, useRef } from 'react';

const useRestoreFocus = () => {
  const activeElement = useRef<Element | null>(null);
  useEffect(() => {

    if (!activeElement.current) {
      activeElement.current = document.activeElement;
    }

    return () => {
      if (activeElement.current) {
        (activeElement.current as HTMLElement).focus();
      }
    }
  }, []);
};

export default useRestoreFocus;
