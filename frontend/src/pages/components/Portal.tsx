import type React from 'react';
import { useState, useLayoutEffect } from 'react';
import { createPortal } from 'react-dom';

type PortalType = {
  children?: React.ReactNode;
};

const Portal = ({ children }: PortalType) => {
  const [portal, setPortal] = useState(null);

  useLayoutEffect(() => {
    const portalContainer = document.createElement('div');
    portalContainer.setAttribute('id', 'portal');
    document.body.appendChild(portalContainer);
    setPortal(portalContainer);
    return () => {
      if (portalContainer.parentNode) {
        portalContainer.parentNode.removeChild(portalContainer);
      }
    };
  }, []);

  if (!portal) {
    return null;
  }

  return createPortal(children, portal);
};

export default Portal;
