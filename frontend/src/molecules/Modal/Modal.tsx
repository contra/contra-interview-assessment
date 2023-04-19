import React, { useState, useEffect } from 'react';
import styles from './Modal.module.css';
import type ModalContainer from './ModalContainer';

const Modal = (props: ModalContainer) => {
  const [showModal, setShowModal] = useState(false);
  useEffect(() => {
    setShowModal(props.show);
    if (props.show) {
      document.body.style.overflow = 'hidden';
    }
  }, [props]);
  return (
    <>
      {showModal && (
        <div
          aria-describedby="dialog_desc"
          aria-labelledby="dialog_label"
          className={styles['modal']}
          role="alertdialog"
        >
          {props.modalHeader?.text && (
            <header className={styles['modal__header']} id="dialog_label">
              {props.modalHeader.text}
            </header>
          )}
          <div className={styles['modal__body']} id="dialog_desc">
            {props.modalBody.content}
          </div>
          {props.modalFooter?.text && (
            <footer className={styles['modal__footer']}>
              {props.modalFooter.text}
            </footer>
          )}
          <div className={styles['modal__controls']}>
            <button
              className={styles['modal__controls__close-button']}
              onClick={() => {
                setShowModal(false);
                document.body.style.overflow = 'visible';
              }}
              type="button"
            >
              CLOSE
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default Modal;
