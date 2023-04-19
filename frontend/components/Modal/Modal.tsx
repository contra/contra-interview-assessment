import { ReactNode, useEffect, useRef, useState } from 'react';
import ReactDOM from 'react-dom';
import styles from './Modal.module.css';

type Props = {
  isOpen: boolean;
  children: ReactNode;
  onClose: () => void;
  mostRecent: boolean;
  id: number;
};

const Modal = ({ isOpen, children, onClose, mostRecent, id }: Props) => {
  const modalRef = useRef<HTMLDivElement>(null);
  const [zIndex, setZIndex] = useState<number>(1);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      setZIndex((prevZIndex) => prevZIndex + 1);
    } else {
      document.body.style.overflow = 'auto';
    }
  }, [isOpen]);

  useEffect(() => {
    if (mostRecent) {
      modalRef.current?.focus();
    }
  }, [mostRecent]);

  const handleClick = (event: React.MouseEvent<HTMLDivElement>) => {
    if (event.target === modalRef.current && !mostRecent) {
      onClose();
    }
  };

  if (!isOpen) {
    return null;
  }

  const isBackdropOpaque = id === 1;
  const modalClassName = `${styles['modal']} ${isOpen ? styles['open'] : ''}`;

  return ReactDOM.createPortal(
    <div
      className={modalClassName}
      role="dialog"
      aria-modal="true"
      aria-hidden={!isOpen}
      onClick={handleClick}
      ref={modalRef}
      tabIndex={-1}
      style={{
        zIndex,
        backgroundColor: isBackdropOpaque
          ? 'rgba(0, 0, 0, 0.5)'
          : 'transparent',
      }}
    >
      <div className={styles['modal-content']}>{children}</div>
    </div>,
    document.getElementById('modal-portal') as HTMLElement
  );
};

export default Modal;
