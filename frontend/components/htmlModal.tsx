import {
  HTMLProps,
  MouseEventHandler,
  MutableRefObject,
  PropsWithChildren,
  ReactEventHandler,
  SyntheticEvent,
  forwardRef,
  useImperativeHandle,
  useRef,
} from 'react';
import styles from '../styles/htmlModal.module.css';

export type HtmlModalImperativeHandle = {
  close: () => void;
  modal: MutableRefObject<HTMLDialogElement | null>;
  open: () => void;
};

export type HtmlModalProps = PropsWithChildren<
  {
    closeOnBackdropClick?: boolean;
    onClose?: (e: SyntheticEvent<HTMLDialogElement, Event>) => void;
  } & HTMLProps<HTMLDialogElement>
>;

export const HtmlModal = forwardRef<HtmlModalImperativeHandle, HtmlModalProps>(
  (props, ref) => {
    const modalRef = useRef<HTMLDialogElement | null>(null);
    useImperativeHandle(
      ref,
      () => ({
        close: () => {
          const modal = modalRef.current;
          if (modal !== null) {
            modal.close();
          }
        },
        modal: modalRef,
        open: () => {
          const modal = modalRef.current;
          if (modal !== null) {
            const overflowFocusTrap = document.createElement('button');
            modal.prepend(overflowFocusTrap); // Ensures scroll will always start at top of dialog regardless of where the first focusable child is
            modal.showModal();
            modal.removeChild(overflowFocusTrap);
          }
        },
      }),
      []
    );

    const handleClick: MouseEventHandler<HTMLDialogElement> = (e) => {
      const modal = modalRef.current;
      if (props.closeOnBackdropClick && modal !== null && e.target === modal) {
        modal.close();
      }
    };

    const handleClose: ReactEventHandler<HTMLDialogElement> = (e) => {
      props.onClose?.(e);
    };

    return (
      <dialog
        className={styles['root']}
        onClick={handleClick}
        onClose={handleClose}
        ref={modalRef}
      >
        <form className={styles['form']}>{props.children}</form>
      </dialog>
    );
  }
);
