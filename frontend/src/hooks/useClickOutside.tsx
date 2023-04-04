import { type RefObject, useCallback, useEffect } from 'react';
import { manager } from '@/components/Modal/modal-instances-manager';

const MOUSE_UP = 'mouseup';

export const useClickOutside = <T extends HTMLElement = HTMLElement>(
  handleClose: () => void,
  ref: RefObject<T> | null,
  modalId: string,
  shouldClose: boolean = true
): void => {
  const handleClick = useCallback(
    (event: MouseEvent) => {
      if (ref && !manager.isTopModal(modalId)) return;

      if (
        ref?.current?.contains &&
        !ref.current.contains(event.target as Node)
      ) {
        handleClose();
      }
    },
    [handleClose, modalId, ref]
  );

  useEffect(() => {
    if (!shouldClose) {
      return;
    }

    document.addEventListener(MOUSE_UP, handleClick);

    // eslint-disable-next-line consistent-return
    return () => {
      document.removeEventListener(MOUSE_UP, handleClick);
    };
  }, [handleClick, shouldClose]);
};
