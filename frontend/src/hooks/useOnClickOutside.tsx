import React, { useEffect } from 'react';

// citation: https://usehooks.com/useOnClickOutside/
const useOnClickOutside = (
  ref: React.RefObject<HTMLDivElement>,
  handler: (event: MouseEvent | TouchEvent) => void
) => {
  useEffect(() => {
    const callBack = (event: MouseEvent | TouchEvent) => {
      if (!ref.current || ref.current.contains(event.target as Node)) {
        return;
      }
      handler(event);
    };

    document.addEventListener('mousedown', callBack);
    document.addEventListener('touchstart', callBack);
    return () => {
      document.removeEventListener('mousedown', callBack);
      document.removeEventListener('touchstart', callBack);
    };
  }, [ref, handler]);
};

export default useOnClickOutside;
