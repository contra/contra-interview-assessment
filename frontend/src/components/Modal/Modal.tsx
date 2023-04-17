import { createPortal } from 'react-dom';
import styles from './styles.module.css';
import { useModalFunctionality } from './utils';

type ModalBaseProps = {
  children: React.ReactNode;
  onClose?: (x: React.MouseEvent) => void;
};

type OptionalProps = {
  [K in Exclude<
    keyof JSX.IntrinsicElements['div'],
    keyof ModalBaseProps
  >]?: JSX.IntrinsicElements['div'][K];
};

type ModalProps = ModalBaseProps & OptionalProps;

const Modal = ({
  children,
  onClose,
  className,

  ...rest
}: ModalProps) => {
  useModalFunctionality();

  return (
    <>
      {createPortal(
        <div className={styles['modalOuter']}>
          <div
            aria-modal="true"
            role="dialog"
            {...rest}
            className={`${className} ${styles['modalInner']}`}
          >
            {children}
            {onClose && (
              <button
                aria-label="close"
                className={styles['closeButton']}
                onClick={(event) => onClose(event)}
                type="button"
              >
                &times;
              </button>
            )}
          </div>
        </div>,
        document.querySelector('#contra_modal_container') as HTMLElement
      )}
    </>
  );
};

export default Modal;
