import { useEffect } from 'react';
import styles from './Modal.module.css';

interface ModalProps {
  onExit: (event: KeyboardEvent | React.MouseEvent<HTMLButtonElement>) => void;
  children: React.ReactNode;
  footer: React.ReactNode;
}

function Modal({ onExit, children, footer }: ModalProps) {
  function onClickHandler(event: React.MouseEvent<HTMLButtonElement>) {
    exit(event);
  }

  function exit(event: KeyboardEvent | React.MouseEvent<HTMLButtonElement>) {
    if (onExit) {
      onExit(event);
    }
  }

  function checkDocumentKeyDown(event: KeyboardEvent) {
    if (event.key === 'Escape' || event.key === 'Esc' || event.keyCode === 27) {
      exit(event);
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
  }, []);

  // Background scrolling
  useEffect(() => {
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
  }, []);

  return (
    <div
      className={styles['modalBackground']}
      aria-labelledby="modal-title"
      id="modal"
      role="dialog"
      tabIndex={-1}
    >
      <div className={styles['modalContainer']}>
        <div className={styles['titleCloseBtn']}>
          <button onClick={onClickHandler}>X</button>
        </div>
        {children}
        <div className={styles['footer']}>{footer}</div>
      </div>
    </div>
  );
}

export default Modal;
