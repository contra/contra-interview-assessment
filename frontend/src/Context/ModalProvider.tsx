import React, { useState, useMemo } from 'react';
import ModalContext from './ModalContext';
import ModalContainer from '../Container/ModalContainer';

interface ModalProviderProps {
  children?: React.ReactNode;
}
function ModalProvider({ children }: ModalProviderProps) {
  const [modalType, setModalType] = useState('');

  const value = useMemo(
    () => ({ modalType, setModalType, isOpen: modalType !== '' }),
    []
  );

  function onExit() {
    setModalType('');
  }

  return (
    <ModalContext.Provider value={value}>
      {children}
      <ModalContainer modalType={modalType} onExit={onExit} />
    </ModalContext.Provider>
  );
}

export default ModalProvider;
