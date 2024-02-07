import { useEffect } from 'react';

const useOnEscKeypress = (handler: (event: KeyboardEvent) => void) => {
  useEffect(() => {
    const callBack = (event: KeyboardEvent) => {
      if (event.key === 'Escape' || event.key === 'Esc') {
        handler(event);
      }
    };

    document.addEventListener('keydown', callBack);
    return () => {
      document.removeEventListener('keydown', callBack);
    };
  }, []);
};

export default useOnEscKeypress;
