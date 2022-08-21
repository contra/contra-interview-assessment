import { type ReactNode, useLayoutEffect, useState } from 'react';
import { createPortal } from 'react-dom';

type PortalProps = {
  children: ReactNode;
};

const Portal = (props: PortalProps) => {
  const { children } = props;
  // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
  const container = globalThis?.document?.body;

  const [isMounted, setIsMounted] = useState(false);

  useLayoutEffect(() => {
    setIsMounted(true);
  }, []);

  return isMounted && Boolean(container)
    ? createPortal(children, container)
    : null;
};

export default Portal;
