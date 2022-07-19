import { createContext } from 'react';

interface ContextProps {
  setModalType: Function;
  isOpen: boolean;
}

const ModalContext = createContext<ContextProps>({
  setModalType: () => null,
  isOpen: false,
});

export default ModalContext;
