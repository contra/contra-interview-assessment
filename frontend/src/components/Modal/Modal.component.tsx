import { Fragment, MutableRefObject, useEffect, useRef } from 'react';
import ReactDOM from 'react-dom';
import styles from './Modal.module.css';
import KeyboardManager from './keyboardManager';

export default function Modal({ isOpen, onClose = () => {}, children, focusRef }: { isOpen: boolean, onClose?: () => void, children?: JSX.Element, focusRef?: MutableRefObject<HTMLElement | null> }) {
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const closeFunction = () => onClose();
    if (isOpen) {
      document.body.classList.add('stopScroll');
      KeyboardManager.register('Escape', closeFunction);
      focusRef?.current?.focus();
    }
    return () => {
      KeyboardManager.unregister('Escape', closeFunction)
      document.body.classList.remove('stopScroll');
    }
  }, [isOpen])

  return isOpen ? ReactDOM.createPortal(
    <Fragment>
      <div className={styles.overlay} onClick={onClose}>
      </div>
      <div className={styles.modalWrapper} ref={modalRef}>
        <div role="dialog" className={styles.modal}>
          {children}
        </div>
      </div>
    </Fragment>,
    document.body
  ) : null;
}
