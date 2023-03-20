import { type PropsWithChildren, useLayoutEffect, useState, useEffect } from 'react';
import { createPortal } from 'react-dom';

type WrapperId = string;

const createRootElement = (wrapperId: WrapperId) => {
  const wrapperElement = document.createElement('div');
  wrapperElement.setAttribute('id', wrapperId);
  document.body.appendChild(wrapperElement);
  return wrapperElement;
};

// React currently throws a warning when using useLayoutEffect on the server.
// To get around it, we can conditionally useEffect on the server (no-op) and
// useLayoutEffect in the browser. We need useLayoutEffect because we want
// `connect` to perform sync updates to a ref to save the latest props after
// a render is actually committed to the DOM.
const useIsomorphicLayoutEffect =
  typeof window === 'undefined' ? useEffect : useLayoutEffect;

export const ReactPortal = ({
  children,
  wrapperId = 'contra-frontend-modal',
}: PropsWithChildren<{ wrapperId?: WrapperId }>) => {
  const [domNode, setDomNode] = useState<HTMLDivElement | null>(null);

  useIsomorphicLayoutEffect(() => {
    let element = document.querySelector<HTMLDivElement>(wrapperId);
    if (!element) {
      element = createRootElement(wrapperId);
    }

    setDomNode(element);

    return () => {
      if (element?.parentNode) {
        element.parentNode.removeChild(element);
      }
    };
  }, [wrapperId]);

  if (domNode === null) return null;
  return createPortal(children, domNode);
};
