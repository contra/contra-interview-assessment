import ModalContext from '../Context/ModalContext';
import { useContext } from 'react';
import { MODAL_TYPES } from '../Container/ModalContainer';

export default () => {
  const { setModalType, isOpen } = useContext(ModalContext);

  function showSimpleModal() {
    setModalType(MODAL_TYPES.SIMPLE);
  }

  return { setModalType, isOpen, showSimpleModal };
};
