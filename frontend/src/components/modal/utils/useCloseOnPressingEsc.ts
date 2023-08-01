import { useEffect, useRef } from 'react';
import { modalHierarchy } from './modalHierarchy';

export const useCloseOnPressingEsc = (
  modalId: string,
  closeCallback: () => void
) => {
  /**
   * Since closeCallback can be defined inline by the user
   *    and we don't wanna keep this useEffect running all the time,
   *    we just store the latest value in a ref.
   */
  const latestCloseCallbackRef = useRef(closeCallback);
  latestCloseCallbackRef.current = closeCallback;

  useEffect(() => {
    const keydownHandler = (event: KeyboardEvent) => {
      // Only the top modal should be closed if there's more than one modal currently active
      if (event.key === 'Escape' && modalHierarchy.isTopModal(modalId)) {
        event.preventDefault();
        latestCloseCallbackRef.current();
      }
    };

    document.body.addEventListener('keydown', keydownHandler);

    return () => {
      document.body.removeEventListener('keydown', keydownHandler);
    };
  }, [modalId]);
};
