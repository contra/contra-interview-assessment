import { useCallback, useEffect } from 'react';
import { manager } from '@/components/Modal/modal-instances-manager';
// import { manager } from '@/components/Modal/modal-instances-manager';

const KEY_NAME_ESC = 'Escape';
const KEY_EVENT_TYPE = 'keyup';

export const useEscapeKey = (
  modalId: string,
  handleClose: () => void,
  shouldClose: boolean = true
): void => {
  const handleEscKey = useCallback(
    (event: KeyboardEvent) => {
      if (!manager.isTopModal(modalId)) return;

      if (event.key === KEY_NAME_ESC) {
        handleClose();
      }
    },
    [handleClose, modalId]
  );

  useEffect(() => {
    if (!shouldClose) {
      return;
    }

    document.addEventListener(KEY_EVENT_TYPE, handleEscKey, false);

    // eslint-disable-next-line consistent-return
    return () => {
      document.removeEventListener(KEY_EVENT_TYPE, handleEscKey, false);
    };
  }, [handleEscKey, shouldClose]);
};
