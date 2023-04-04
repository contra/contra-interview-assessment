import { useEffect, useState, type ReactNode, type ReactPortal } from 'react';
import { createPortal } from 'react-dom';

type PortalProps = {
  children: ReactNode;
  portalId: string;
};

const Portal = ({ children, portalId }: PortalProps): ReactPortal | null => {
  const [mounted, setMounted] = useState<boolean>(false);

  useEffect(() => {
    setMounted(true);
    return () => setMounted(false);
  }, []);
  const portalNode = document.querySelector(`#${portalId}`);

  return mounted && portalNode ? createPortal(children, portalNode) : null;
};

export default Portal;
