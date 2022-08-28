// :( this two rules are not up to date to support the <dialog/> html element
// Dialog is in fact an interactive element and it implements the esc to close behavior out of the box.
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import { type PropsWithChildren } from 'react';
import { Button } from '@/packages/button';
import { Portal } from '@/packages/portal';
import styles from './Modal.module.css';

type ModalProps = {
  onBackdropClick: () => void;
};

export const Modal = (props: PropsWithChildren<ModalProps>) => {
  return (
    <Portal>
      <dialog
        className={styles['dialog']}
        onClick={({ target }) => {
          if ((target as HTMLElement).nodeName === 'DIALOG')
            props.onBackdropClick();
        }}
        ref={(node) => {
          if (node?.open === false) node.showModal();
        }}
      >
        <div className={styles['content']}>{props.children}</div>
      </dialog>
    </Portal>
  );
};

type ModalXButtonProps = {
  onClick: () => void;
};

Modal.XButton = (props: ModalXButtonProps) => (
  <div className={styles['closeButton']}>
    <Button
      ariaLabel="Close this dialog"
      onClick={props.onClick}
      variant="icon"
    >
      X
    </Button>
  </div>
);

Modal.Footer = (props: PropsWithChildren) => (
  <footer className={styles['modalFooter']}>{props.children}</footer>
);
