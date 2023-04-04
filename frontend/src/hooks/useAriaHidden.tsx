import { useEffect } from 'react';
import { manager } from '@/components/Modal/modal-instances-manager';

export const useAriaHidden = (targetId: string, shouldActivate: boolean) => {
  useEffect(() => {
    if (!shouldActivate || !targetId) {
      return;
    }

    const body = document.querySelector('body');
    const elements = body?.querySelectorAll(`:not([id="${targetId}"])`);

    // Add 'aria-hidden' attribute to all the elements except the target
    elements?.forEach((element) => {
      element.setAttribute('aria-hidden', 'true');
    });

    // Remove the attribute on hook cleanup
    // eslint-disable-next-line consistent-return
    return () => {
      // Only remove aria-hidden attribute when there are other active modals
      if (!manager.hasActiveModals())
        elements?.forEach((element) => {
          element.removeAttribute('aria-hidden');
        });
    };
  }, [shouldActivate, targetId]);
};
