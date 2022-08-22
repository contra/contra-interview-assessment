import { RefObject } from "react";

export const focusElementsInModal = (ref : RefObject<HTMLElement>, shouldFocusFirstFocusableElement : boolean) => {
  const  focusableElements =
    'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])';
  const firstFocusableElement = ref?.current?.querySelectorAll(focusableElements)[0] as HTMLElement;
  const focusableContent = ref?.current?.querySelectorAll(focusableElements) as NodeListOf<HTMLElement>;
  const lastFocusableElement = focusableContent[focusableContent.length - 1] as HTMLElement;

  document.addEventListener('keydown', function(e) {
    let isTabPressed = e.key === 'Tab' || e.keyCode === 9;
    if (!isTabPressed) {
      return;
    }
    if (e.shiftKey) {
      if (document.activeElement === firstFocusableElement) {
        lastFocusableElement.focus();
        e.preventDefault();
      }
    } else {
      if (document.activeElement === lastFocusableElement) {
        firstFocusableElement.focus();
        e.preventDefault();
      }
    }
  });

  shouldFocusFirstFocusableElement && firstFocusableElement.focus();
}