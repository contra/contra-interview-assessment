import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { modalRootSelector } from '@/constants';

const Portal = ({ children }: PortalProps) => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);

    return () => {
      setMounted(false);
    };
  }, []);

  return mounted
    ? createPortal(
        children,
        document.querySelector(modalRootSelector) ?? document.body
      )
    : null;
};

export type PortalProps = { children?: React.ReactNode };

export default Portal;
