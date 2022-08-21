import { type Ref, useEffect, useRef, useCallback } from 'react';

export type MouseOrTouchEvent = MouseEvent | TouchEvent;

export default function useOutsideClick<T extends HTMLElement>(
  handleClick: (event: MouseOrTouchEvent) => void
): Ref<T> {
  const ref = useRef<T>();

  const handleClickOutside = useCallback(
    (event: MouseOrTouchEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        handleClick(event);
      }
    },
    [handleClick]
  );

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside, true);
    document.addEventListener('touchstart', handleClickOutside, true);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside, true);
      document.removeEventListener('touchstart', handleClickOutside, true);
    };
  }, [handleClickOutside]);

  return ref as Ref<T>;
}
