import { createPortal } from 'react-dom';
import { useModalFunctionality } from './utils';
import styles from './styles.module.css';

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
            role="dialog"
            aria-modal="true"
            {...rest}
            className={`${className} ${styles['modalInner']}`}
          >
            {children}
            {onClose && (
              <button
                aria-label="close"
                className={styles['closeButton']}
                onClick={(e) => onClose?.(e)}
              >
                &times;
              </button>
            )}
          </div>
        </div>,
        document.getElementById('contra_modal_container') as HTMLElement
      )}
    </>
  );
};

export default Modal;
