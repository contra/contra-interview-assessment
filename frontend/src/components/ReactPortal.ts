import type React from 'react';
import { useState, useLayoutEffect } from 'react';
import { createPortal } from 'react-dom';

type ReactPortalTypes = {
  children?: React.ReactNode;
  wrapperId?: string
} 
function createWrapperAndAppendToBody(wrapperId: string) {
    const wrapperElement = document.createElement('div');
    wrapperElement.setAttribute("id", wrapperId);
    document.body.appendChild(wrapperElement);
    return wrapperElement;
}

const ReactPortal = ({ children, wrapperId = "react-portal-wrapper" }: ReactPortalTypes) => {
    const [wrapperElement, setWrapperElement] = useState(null as unknown as DocumentFragment | Element);
  
    useLayoutEffect(() => {
      let element = document.getElementById(wrapperId);
      let systemCreated = false;
      // if element is not found with wrapperId or wrapperId is not provided,
      // create and append to body
      if (!element) {
        systemCreated = true;
        element = createWrapperAndAppendToBody(wrapperId);
      }

      setWrapperElement(element);
    
      return () => {
        // delete the programatically created element
        if (systemCreated && element?.parentNode) {
          element.parentNode.removeChild(element);
        }
      }
    }, [wrapperId]);
  
    // wrapperElement state will be null on very first render.
    if (wrapperElement === null) return null;
  
    return createPortal(children, wrapperElement);
}

export default ReactPortal;