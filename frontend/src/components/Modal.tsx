import { styled } from '@/utils/styles';
import { type PropsWithChildren } from 'react';
import { useFocusTrap } from '@/utils/use-focus-trap';
import { ReactPortal } from './ReactPortal';

const ModalBackground = styled('div', {
  backgroundColor: 'rgba(0,0,0,0.7)',
  bottom: 0,
  left: 0,
  position: 'fixed',
  right: 0,
  top: 0,
  zIndex: 10,
});

const ModalContainer = styled('div', {
  backgroundColor: '#fefefe',
  border: '1px solid #888',
  boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)',
  padding: '20px',
  margin: 0,
  width: '100%',
  height: '100%',

  '@md': {
    borderRadius: '4px',
    margin: '10% auto',
    width: '50%',
    height: 'auto',
  },
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
      <ModalBackground>
        <ModalContainer aria-hidden={!open} aria-modal ref={ref} role="dialog">
          {children}
        </ModalContainer>
      </ModalBackground>
    </ReactPortal>
  );
};
