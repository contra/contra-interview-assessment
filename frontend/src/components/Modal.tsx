import { styled } from '@stitches/react';
import { type PropsWithChildren } from 'react';
import { useFocusTrap } from '@/hooks/use-focus-trap';
import { ReactPortal } from './ReactPortal';

const ModalBackground = styled('div', {
  background: 'rgba(0,0,0,0.7)',
  bottom: 0,
  left: 0,
  position: 'fixed',
  right: 0,
  top: 0,
  zIndex: 10,
});

// event.relatedTarget might be worth researching in the future
export const Modal = ({
  children,
  open,
}: PropsWithChildren<{ open: boolean }>) => {
  const ref = useFocusTrap<HTMLDivElement>();

  if (!open) return null;

  return (
    <ReactPortal>
      <div aria-hidden={!open} aria-modal ref={ref} role="dialog">
        {children}
      </div>
      <div
        style={{
          backgroundColor: 'rgba(0,0,0,0.7)',
          bottom: 0,
          left: 0,
          position: 'fixed',
          right: 0,
          top: 0,
          zIndex: 10,
        }}
      />
    </ReactPortal>
  );
};
