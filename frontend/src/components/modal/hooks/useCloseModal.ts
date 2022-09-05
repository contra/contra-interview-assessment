import { useContext } from 'react';
import { ModalContext } from '../Modal';

type IUseCloseModal = () => void

const useCloseModal = () : IUseCloseModal => {
  const { onClose } = useContext(ModalContext);

  return onClose;
};

export default useCloseModal;
