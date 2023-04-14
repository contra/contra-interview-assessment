import { useEffect } from 'react';

let count = 0;

const focusableElementsSelector =
  'a[href], button, textarea, input, select, details, [tabindex]:not([tabindex="-1"])';

function getTopModal() {
  const container = document.getElementById(
    'contra_modal_container'
  ) as HTMLElement;
  if (container === null) throw Error('No #contra_modal_container in DOM');

  const modals = container.childNodes;
  if (!modals || modals.length === 0) return null;
  const topModal = modals[modals.length - 1];

  return topModal as HTMLElement;
}

function getFocusableElements(element: HTMLElement | null) {
  if (!element) return [];

  return Array.from(element.querySelectorAll(focusableElementsSelector)).filter(
    (el) => !el.hasAttribute('disabled') && !el.getAttribute('aria-hidden')
  );
}

function keyDownListener(e: KeyboardEvent) {
  if (count === 0 || e.key !== 'Tab') return;

  const topModal = getTopModal();
  const focusableElements = getFocusableElements(topModal);

  const first = focusableElements[0] as HTMLElement;
  const last = focusableElements[focusableElements.length - 1] as HTMLElement;

  if (e.shiftKey && document.activeElement === first) {
    last?.focus();
    e.preventDefault();
  } else if (
    (!e.shiftKey && document.activeElement === last) ||
    !topModal?.contains(document.activeElement)
  ) {
    first?.focus();
    e.preventDefault();
  }
}

export function useModalFunctionality() {
  useEffect(() => {
    count++;

    const isFirst = count === 1;
    if (isFirst) {
      document.documentElement.classList.add('noscroll' as string);
      document.getElementById('__next')?.setAttribute('aria-hidden', 'true');
      window.addEventListener('keydown', keyDownListener);
    }

    // If something outside the modal is focused
    if (!getTopModal()?.contains(document.activeElement)) {
      // remove focus entirely so that the first focusable element in the modal is selected the next time the user presses tab
      (document.activeElement as HTMLElement)?.blur();

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
        document.getElementById('__next')?.setAttribute('aria-hidden', 'false');
        document.documentElement.classList.remove('noscroll' as string);
        window.removeEventListener('keydown', keyDownListener);
      }
    };
  }, []);
}
