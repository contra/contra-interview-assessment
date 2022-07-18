import { createContext } from 'react';

interface ContextProps {
  modalType: string;
  setModalType: Function;
  isOpen: boolean;
}

const ModalContext = createContext<ContextProps>({
  modalType: '',
  setModalType: () => null,
  isOpen: false,
});

export default ModalContext;
