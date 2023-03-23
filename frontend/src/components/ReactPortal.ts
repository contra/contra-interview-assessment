import { type PropsWithChildren, useState } from 'react';
import { createPortal } from 'react-dom';
import { useIsomorphicLayoutEffect } from '@/utils/use-isomorphic-layout';

type WrapperId = string;

const createRootElement = (wrapperId: WrapperId) => {
  const wrapperElement = document.createElement('div');
  wrapperElement.setAttribute('id', wrapperId);
  document.body.appendChild(wrapperElement);
  return wrapperElement;
};

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
