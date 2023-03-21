import { type PropsWithChildren } from 'react';
import { styled } from '@/utils/styles';
import { useEscapeKeyListener } from '@/utils/use-escape-trap';
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
  height: '100%',
  margin: 0,
  padding: '20px',
  width: '100%',

  // eslint-disable-next-line canonical/sort-keys
  '@md': {
    borderRadius: '4px',
    height: 'auto',
    margin: '10% auto',
    width: '50%',
  },
});

// event.relatedTarget might be worth researching in the future
export const Modal = ({
  children,
  open,
  onClose,
}: PropsWithChildren<{ onClose: () => void, open: boolean }>) => {
  const ref = useFocusTrap<HTMLDivElement>();
  useEscapeKeyListener(onClose);

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
