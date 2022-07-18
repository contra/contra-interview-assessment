import { ComponentType, LazyExoticComponent } from 'react';
import React, { Suspense } from 'react';

interface ModalProps {
  modalType: string | null;
  onExit: (event: KeyboardEvent | React.MouseEvent<HTMLButtonElement>) => void;
}

const SimpleModal = React.lazy(() => import('../Component/SimpleModal'));

export enum MODAL_TYPES {
  SIMPLE = 'simple',
}

const MODALS: {
  [modal: string]: LazyExoticComponent<ComponentType<any>>;
} = {
  [MODAL_TYPES.SIMPLE]: SimpleModal,
};

function ModalContainer({ modalType, onExit }: ModalProps) {
  if (modalType && MODALS[modalType]) {
    return (
      <Suspense fallback={<div>Loading...</div>}>
        <SimpleModal onExit={onExit} />
      </Suspense>
    );
  }

  return null;
}

export default ModalContainer;
