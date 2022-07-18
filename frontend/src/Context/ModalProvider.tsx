import React, { useState, useMemo, useEffect } from 'react';
import ModalContext from './ModalContext';
import ModalContainer from '../Container/ModalContainer';
import ReactDOM from 'react-dom';

interface ModalProviderProps {
  children?: React.ReactNode;
}

function ModalProvider({ children }: ModalProviderProps) {
  const [modalType, setModalType] = useState('');

  const [isSSR, setIsSSR] = useState(true);

  const value = useMemo(
    () => ({ modalType, setModalType, isOpen: modalType !== '' }),
    []
  );

  function onExit() {
    setModalType('');
  }

  useEffect(() => {
    setIsSSR(false);
  }, []);

  if (isSSR) {
    return null;
  }

  const portalRootElement = document && document.getElementById('portal-root');

  return (
    <ModalContext.Provider value={value}>
      {children}

      {portalRootElement &&
        ReactDOM.createPortal(
          <ModalContainer modalType={modalType} onExit={onExit} />,
          portalRootElement
        )}
    </ModalContext.Provider>
  );
}

export default ModalProvider;
