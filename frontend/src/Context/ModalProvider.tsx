import React, { useState, useMemo, useEffect } from 'react';
import ModalContext from './ModalContext';
import ModalContainer from '../Container/ModalContainer';
import ReactDOM from 'react-dom';

interface ModalProviderProps {
  children?: React.ReactNode;
}

function ModalProvider({ children }: ModalProviderProps) {
  const [modalsType, setModalsType] = useState<string[]>([]);

  const [isSSR, setIsSSR] = useState(true);

  function setModalType(modalType: string) {
    setModalsType((listModals) => {
      return listModals.concat(modalType);
    });
  }

  function onExit() {
    if (modalsType.length >= 1) {
      setModalsType((listModals) => {
        return listModals.slice(0, -1);
      });
    }
  }

  const value = useMemo(
    () => ({
      setModalType,
      isOpen: modalsType.length >= 1,
    }),
    []
  );

  useEffect(() => {
    setIsSSR(false);
  }, []);

  function checkDocumentKeyDown(event: KeyboardEvent) {
    if (event.key === 'Escape' || event.key === 'Esc' || event.keyCode === 27) {
      onExit();
    }
  }

  // Register Escape event
  useEffect(() => {
    setTimeout(() => {
      document.addEventListener('keydown', checkDocumentKeyDown);
    });

    return () => {
      setTimeout(() => {
        document.removeEventListener('keydown', checkDocumentKeyDown);
      });
    };
  }, [modalsType]);

  // Background scrolling lock
  useEffect(() => {
    if (modalsType.length !== 1) {
      return;
    }

    requestAnimationFrame(() => {
      const scrollY = window.scrollY;
      document.body.style.position = 'fixed';
      document.body.style.top = `-${scrollY}px`;
    });

    return () => {
      requestAnimationFrame(() => {
        const scrollY = document.body.style.top;
        document.body.style.position = '';
        document.body.style.top = '';
        window.scrollTo(0, parseInt(scrollY || '0') * -1);
      });
    };
  }, [modalsType]);

  if (isSSR) {
    return null;
  }

  const portalRootElement = document && document.getElementById('portal-root');

  return (
    <ModalContext.Provider value={value}>
      {children}

      {portalRootElement &&
        ReactDOM.createPortal(
          <ModalContainer modalsType={modalsType} onExit={onExit} />,
          portalRootElement
        )}
    </ModalContext.Provider>
  );
}

export default ModalProvider;
