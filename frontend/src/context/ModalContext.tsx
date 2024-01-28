import React, {
  type PropsWithChildren,
  createContext,
  useContext,
  useState,
} from 'react';

type ModalContextType = {
  modalStack: string[];
  popModal: () => void;
  pushModal: (modalId: string) => void;
};

const ModalContext = createContext<ModalContextType | null>(null);

export const useModalStack = () => {
  const context = useContext(ModalContext);
  if (!context) {
    throw new Error('useModalStack must be used within a ModalStackProvider');
  }

  return context;
};

export const ModalStackProvider = ({ children }: PropsWithChildren) => {
  const [modalStack, setModalStack] = useState<string[]>([]);

  const pushModal = (modalId: string) => {
    setModalStack((previousStack) => [...previousStack, modalId]);
  };

  const popModal = () => {
    setModalStack((previousStack) => previousStack.slice(0, -1));
  };

  return (
    // eslint-disable-next-line react/jsx-no-constructed-context-values
    <ModalContext.Provider value={{ modalStack, popModal, pushModal }}>
      {children}
    </ModalContext.Provider>
  );
};
