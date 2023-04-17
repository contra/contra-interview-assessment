import { useEffect } from 'react';

let count = 0;

const focusableElementsSelector =
  'a[href], button, textarea, input, select, details, [tabindex]:not([tabindex="-1"])';

const getTopModal = function () {
  const container = document.querySelector('#contra_modal_container');
  if (container === null) throw new Error('No #contra_modal_container in DOM');

  const modals = container.childNodes;
  if (modals.length === 0) return null;
  const topModal = modals[modals.length - 1];

  return topModal as HTMLElement;
};

const getFocusableElements = function (element: HTMLElement | null) {
  if (!element) return [];

  return Array.from(element.querySelectorAll(focusableElementsSelector)).filter(
    (focusableElement) =>
      !focusableElement.hasAttribute('disabled') &&
      !focusableElement.getAttribute('aria-hidden')
  ) as HTMLElement[];
};

const keyDownListener = function (event: KeyboardEvent) {
  if (count === 0 || event.key !== 'Tab') return;

  const topModal = getTopModal();
  const focusableElements = getFocusableElements(topModal);

  const first = focusableElements[0];
  const last = focusableElements[focusableElements.length - 1];

  if (event.shiftKey && document.activeElement === first) {
    last?.focus();
    event.preventDefault();
  } else if (
    (!event.shiftKey && document.activeElement === last) ||
    !topModal?.contains(document.activeElement)
  ) {
    first?.focus();
    event.preventDefault();
  }
};

export const useModalFunctionality = function () {
  useEffect(() => {
    count++;

    const isFirst = count === 1;
    if (isFirst) {
      document.documentElement.classList.add('noscroll' as string);
      document.querySelector('#__next')?.setAttribute('aria-hidden', 'true');
      window.addEventListener('keydown', keyDownListener);
    }

    // If something outside the modal is focused
    if (!getTopModal()?.contains(document.activeElement)) {
      // remove focus entirely so that the first focusable element in the modal is selected the next time the user presses tab
      const activeElement = document.activeElement;
      if (activeElement instanceof HTMLElement) activeElement.blur();

      /*
        // Alternative option: focus the first element in the modal
        const firstFocusableElement = getFocusableElements(getTopModal())[0];
        if (firstFocusableElement instanceof HTMLElement) {
          firstFocusableElement.focus();
        }
      */
    }

    return () => {
      count--;

      const noModalsLeft = count === 0;
      if (noModalsLeft) {
        document.querySelector('#__next')?.setAttribute('aria-hidden', 'false');
        document.documentElement.classList.remove('noscroll' as string);
        window.removeEventListener('keydown', keyDownListener);
      }
    };
  }, []);
};
