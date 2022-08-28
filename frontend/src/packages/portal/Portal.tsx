import { type PropsWithChildren, useEffect, useRef } from 'react';
import ReactDOM from 'react-dom';
import { useForceUpdate } from '@/packages/hooks/use-force-update';

/**
 * Render children into a new body DOM node outside of the parent component hierarchy DOM.
 */
export const Portal = ({ children }: PropsWithChildren) => {
  const nodeRef = useNewBodyNode();

  if (!nodeRef.current) return null;
  return ReactDOM.createPortal(children, nodeRef.current);
};

function useNewBodyNode() {
  const node = useRef<HTMLDivElement>();
  const forceUpdate = useForceUpdate();

  // Lazily create the new body node on first render in order to support server-side rendering.
  useEffect(() => {
    node.current = document.createElement('div');
    document.body.appendChild(node.current);
    forceUpdate();

    return () => {
      if (node.current) document.body.removeChild(node.current);
    };
  }, [forceUpdate]);

  return node;
}
