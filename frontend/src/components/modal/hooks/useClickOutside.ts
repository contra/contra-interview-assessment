import { type RefObject, useEffect, useCallback } from 'react';

const useClickOutside = (ref: RefObject<HTMLDialogElement>, onClickOutside?: () => void) => {
  const handleClickOutside = useCallback((event: MouseEvent) => {
      if (!onClickOutside) return;
      const element = event.target as Node;

      // Detect click outside dialog content
      if (element.nodeName === "DIALOG") {
          event.preventDefault();
          event.stopPropagation();
          onClickOutside();
      }
  }, [onClickOutside]);

  useEffect(() => {
      const node = ref.current;

      node?.addEventListener("click", handleClickOutside);

      return () => {
          node?.removeEventListener("click", handleClickOutside);
      }
  }, [handleClickOutside, ref])

  return {handleClickOutside}
};

export default useClickOutside;
