import type React from 'react';
import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';

type ReactPortalType = {
  children: React.ReactElement;
  wrapperId: string;
};

const createWrapperAndAppendToBody = (wrapperId: string) => {
  const wrapperElement = document.createElement('div');
  wrapperElement.setAttribute('id', wrapperId);
  document.body.appendChild(wrapperElement);
  return wrapperElement;
};

const ReactPortal = ({ children, wrapperId }: ReactPortalType) => {
  const [wrapperElement, setWrapperElement] = useState<HTMLDivElement | null>(
    null
  );

  useEffect(() => {
    const element =
      document.querySelector<HTMLDivElement>(wrapperId) ??
      createWrapperAndAppendToBody(wrapperId);

    setWrapperElement(element);

    return () => {
      element.parentNode?.removeChild(element);
    };
  }, [wrapperId]);

  return wrapperElement ? createPortal(children, wrapperElement) : null;
};

export default ReactPortal;
