import { createContext, useContext, type RefObject } from 'react';
import { isDevelopment } from '@/utils';

type ModalContext = {
  dataState: 'closed' | 'open';
  descriptorId?: string;
  disablePortal?: boolean;
  firstFocusElementRef?: RefObject<HTMLElement>;
  isModalOpen: boolean;
  setDescriptorId: (descriptorId: string) => void;
  setTitleId: (titleId: string) => void;
  shouldCloseOnInteractOutside?: boolean;
  shouldShowOverlay?: boolean;
  titleId?: string;
  triggerRef?: RefObject<HTMLElement>;
  updateModalOpenState: (isOpen: boolean) => void;
};

const ModalContext = createContext<ModalContext | undefined>(undefined);

export const ModalContextProvider = ModalContext.Provider;

type ModalContextConsumers =
  | 'Close'
  | 'Content'
  | 'Description'
  | 'Title'
  | 'Trigger';

export const useModalContext = (consumer: ModalContextConsumers) => {
  const context = useContext(ModalContext) as ModalContext | undefined;

  if (isDevelopment && !context) {
    throw new Error(
      `Cannot use Modal${consumer} without a ModalContext provider`
    );
  }

  return context as ModalContext;
};
