import React, { useEffect, useRef } from "react";
import { createPortal } from "react-dom";

interface PortalProps {
  children: React.ReactNode | React.ReactNode[];
  rootId?: string;
  el?: string;
}

const Portal = (
  {
    children,
    rootId = "root-portal",
    el = "div"
  } : PortalProps) => {
  const target = useRef<HTMLElement | null>(null);

  useEffect(() => {
    let container = document.getElementById(rootId) as HTMLElement;

    if (!container) {
      container = document.createElement(el);
      container.setAttribute("id", rootId);
      document.body.appendChild(container);
    }

    container.appendChild(target.current as Node);

    return () => {
      if (target instanceof HTMLElement) target?.current?.remove();
      if (container.childNodes.length === 0) {
        container.remove();
      }
    };
  }, [rootId]);

  if (!target.current && typeof window === "object") {
    target.current = document.createElement(el);
  }

  return target.current ? createPortal(children, target.current) : null;
};

export default Portal;