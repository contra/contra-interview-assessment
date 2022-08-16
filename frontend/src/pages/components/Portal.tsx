import type React from 'react';
import { useState, useLayoutEffect } from 'react';
import { createPortal } from 'react-dom';

type PortalType = {
  children?: React.ReactNode;
};

const Portal = ({ children }: PortalType) => {
  const [portal, setPortal] = useState(null as any);

  useLayoutEffect(() => {
    const portalContainer = document.createElement('div');
    portalContainer.setAttribute('id', 'portal');
    document.body.appendChild(portalContainer);
    setPortal(portalContainer);

    return () => {
      // tear down effect to remove portal container from DOM
      // without this portal container will accumulate in the DOM
      if (portalContainer.parentNode) {
        portalContainer.parentNode.removeChild(portalContainer);
      }
    };
  }, []);

  // need this to prevent "Target container is not a DOM element" error
  if (!portal) {
    return null;
  }

  return createPortal(children, portal);
};

export default Portal;
