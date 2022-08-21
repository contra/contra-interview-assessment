import { canUseDOM, isNotUndefined } from './general';

export type FocusableTarget = HTMLElement | { focus: () => void };

export const getPrefersReducedMotion = () => {
  if (!canUseDOM() || !isNotUndefined(window.matchMedia)) return false;
  const QUERY = '(prefers-reduced-motion: no-preference)';
  const mediaQueryList = window.matchMedia(QUERY);
  const prefersReducedMotion = !mediaQueryList.matches;
  return prefersReducedMotion;
};

export const isSelectableInput = (
  element: unknown
): element is FocusableTarget & { select: () => void } =>
  element instanceof HTMLInputElement && 'select' in element;

export const focusElement = (
  element?: FocusableTarget | null,
  select = false
) => {
  const prefersReducedMotion = getPrefersReducedMotion();
  // only focus if that element is focusable
  if (element?.focus) {
    const previouslyFocusedElement = document.activeElement;

    element.focus({ preventScroll: prefersReducedMotion });

    if (
      element !== previouslyFocusedElement &&
      isSelectableInput(element) &&
      select
    ) {
      element.select();
    }
  }
};

export const getTabbableChildItems = <T extends HTMLElement = HTMLElement>(
  container: T
) => {
  const tabbableChildItems: HTMLElement[] = [];

  const walker = document.createTreeWalker(container, NodeFilter.SHOW_ELEMENT, {
    acceptNode(
      node: Node & {
        disabled?: boolean;
        hidden?: boolean;
        tabIndex: number;
        type?: string;
      }
    ) {
      const isHiddenInput =
        node.nodeName.toLowerCase() === 'input' && node.type === 'hidden';
      if (node.disabled || node.hidden || isHiddenInput) {
        return NodeFilter.FILTER_SKIP;
      }

      return node.tabIndex >= 0
        ? NodeFilter.FILTER_ACCEPT
        : NodeFilter.FILTER_SKIP;
    },
  });

  while (walker.nextNode())
    tabbableChildItems.push(walker.currentNode as HTMLElement);

  return tabbableChildItems;
};
