import React from 'react';
import styles from './Modal.module.css';
import FocusTrap from 'focus-trap-react';

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

  return (
    <FocusTrap>
      <div
        className={styles['modalBackground']}
        aria-labelledby="modal-title"
        id="modal"
        role="dialog"
        tabIndex={-1}
      >
        <section className={styles['modalContainer']}>
          <div className={styles['titleCloseBtn']}>
            <button onClick={onClickHandler}>X</button>
          </div>
          {children}
          <div className={styles['footer']}>{footer}</div>
        </section>
      </div>
    </FocusTrap>
  );
}

export default Modal;
