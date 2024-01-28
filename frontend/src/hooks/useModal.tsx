import { useEffect, useRef } from 'react';

export const useModal = (
  isOpen: boolean,
  onClose: () => void
): React.RefObject<HTMLDivElement> => {
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const closeOnEscapeKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    document.addEventListener('keydown', closeOnEscapeKey);

    return () => {
      document.removeEventListener('keydown', closeOnEscapeKey);
    };
  }, [onClose]);

  useEffect(() => {
    if (isOpen) {
      // disable scrolling while modal is open
      document.body.style.overflow = 'hidden';
      // focus on modal element as soon as it is open
      modalRef.current?.focus();
    }

    return (): void => {
      // reset overflow of body once modal is closed.
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  return modalRef;
};
