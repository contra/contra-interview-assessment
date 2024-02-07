import { useEffect } from 'react';

const useDisableScroll = (hideScroll: boolean) => {
  useEffect(() => {
    if (hideScroll) {
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [hideScroll]);
};

export default useDisableScroll;
