import { useRef, useEffect, useState } from 'react';
import { createPortal } from 'react-dom';

type Props = {
  children: React.ReactNode;
  selector: string;
};

export const Portal = ({ children, selector }: Props) => {
  const [mount, setMount] = useState(false);
  const ref = useRef<DocumentFragment | Element | null>(null);

  useEffect(() => {
    ref.current = document.querySelector(selector);
    setMount(true);
  }, [selector]);

  return mount && ref.current ? createPortal(children, ref.current) : null;
};
