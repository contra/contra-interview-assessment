import { useCallback, useEffect } from 'react';

export const useOutsideClick = (
  closeModal: () => void,
  ref: React.RefObject<HTMLDivElement>
) => {
  const checkIfClickedOutside = useCallback(
    ({ target }: MouseEvent) => {
      if (ref.current && ref.current === (target as Node)) {
        closeModal();
      }
    },
    [ref, closeModal]
  );

  useEffect(() => {
    window.addEventListener('mouseup', checkIfClickedOutside);
    return () => window.removeEventListener('mouseup', checkIfClickedOutside);
  }, [checkIfClickedOutside]);
};
