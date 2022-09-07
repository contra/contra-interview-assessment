import { type RefObject, useEffect } from 'react';
import loadDialogPolyfill from '../utils/loadDialogPolyfill';

const useShowModal = (ref: RefObject<HTMLDialogElement>) => {
  useEffect(() => {
    const node = ref.current;

    if (node && !node.open) {
      // Check browser support for <dialog>
      if (typeof HTMLDialogElement === 'function') {
        node.showModal();
      } else {
        // Load <dialog> polyfill if no browser support
        loadDialogPolyfill(node);
      }
    }
  }, [ref]);
};

export default useShowModal;
