import { ComponentType, LazyExoticComponent } from 'react';
import React, { Suspense } from 'react';

interface ModalProps {
  modalsType: string[] | null;
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

interface ModalLazyLoadProps {
  onExit: (event: KeyboardEvent | React.MouseEvent<HTMLButtonElement>) => void;
}

function ModalContainer({ modalsType, onExit }: ModalProps) {
  if (modalsType && Array.isArray(modalsType)) {
    return (
      <>
        {modalsType.map((modalType, index) => {
          if (modalType) {
            const Component = MODALS[
              modalType
            ] as ComponentType<ModalLazyLoadProps>;
            return (
              <Suspense fallback={<div>Loading...</div>} key={`${index}-modal`}>
                <Component onExit={onExit} />
              </Suspense>
            );
          }
          return <></>;
        })}
      </>
    );
  }

  return <></>;
}

export default ModalContainer;
