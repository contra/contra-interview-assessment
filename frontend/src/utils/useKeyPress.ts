import { useState, useEffect, useCallback } from 'react';

export const useKeyPress = (targetKey: string) => {
  const [keyPressed, setKeyPressed] = useState(false);

  const downHandler = useCallback(
    (key: KeyboardEvent) => {
      if (key.code === targetKey) {
        setKeyPressed(true);
      }
    },
    [targetKey]
  );

  const upHandler = useCallback(
    (key: KeyboardEvent) => {
      if (key.code === targetKey) {
        setKeyPressed(false);
      }
    },
    [targetKey]
  );

  useEffect(() => {
    window.addEventListener('keydown', downHandler);
    window.addEventListener('keyup', upHandler);

    return () => {
      window.addEventListener('keydown', downHandler);
      window.addEventListener('keyup', upHandler);
    };
  }, [downHandler, upHandler]);

  return keyPressed;
};
