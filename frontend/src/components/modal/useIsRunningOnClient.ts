import { useEffect, useState } from 'react';

export const useIsRunningOnClient = (): boolean => {
  const [isClientSide, setIsClientSide] = useState(false);

  useEffect(() => {
    setIsClientSide(true);
  }, []);

  return isClientSide;
};
