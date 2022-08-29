// :( this two rules are not up to date to support the <dialog/> html element
// Dialog is in fact an interactive element and it implements the esc to close behavior out of the box.
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import { type PropsWithChildren } from 'react';
import { Button } from '@/packages/button';
import { useFocusScope } from '@/packages/hooks/use-focus-scope';
import { usePreventScroll } from '@/packages/hooks/use-prevent-scroll';
import { Portal } from '@/packages/portal';
import styles from './Modal.module.css';

type ModalProps = {
  onClose: () => void;
};

export const Modal = (props: PropsWithChildren<ModalProps>) => {
  const { createFocusScope } = useFocusScope();
  usePreventScroll();

  return (
    <Portal>
      <dialog
        className={styles['dialog']}
        onClick={({ target }) => {
          if ((target as HTMLElement).nodeName === 'DIALOG') props.onClose();
        }}
        ref={(node) => {
          if (node?.open === false) node.showModal();
          node?.addEventListener('close', () => props.onClose());
          createFocusScope(node);
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
