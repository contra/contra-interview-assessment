import {
  MouseEventHandler,
  PropsWithChildren,
  SyntheticEvent,
  useEffect,
  useRef,
  useState,
} from 'react';
import { createPortal } from 'react-dom';
import styles from '../styles/reactModal.module.css';

export type ReactModalProps = PropsWithChildren<{
  closeOnBackdropClick?: boolean;
  onClose?: (e: SyntheticEvent | KeyboardEvent) => void;
  open: boolean;
}>;

export const ReactModal = (props: ReactModalProps) => {
  const presentationRef = useRef<HTMLDivElement | null>(null);
  const [container, setContainer] = useState<HTMLBodyElement | null>(null);

  useEffect(() => {
    setContainer(document.querySelector('body'));
    const handleEscapePress = (e: KeyboardEvent) => {
      if (
        props.onClose &&
        e.key === 'Escape' &&
        !presentationRef.current?.hasAttribute('inert')
      ) {
        props.onClose(e);
      }
    };
    document.addEventListener('keydown', handleEscapePress, false);
    return () => {
      document.removeEventListener('keydown', handleEscapePress, false);
    };
  }, []);

  useEffect(() => {
    const bodyChildren = document.querySelector('body')?.children;
    if (bodyChildren) {
      const allModals = document.querySelectorAll('.reactModal');
      // If props.open === true, check length > 1 instead of 0 because the `useEffect()` will happen after the element is rendered into the DOM, meaning the very last element is the new (nested) modal and the previous element is the parent
      const currentModalIndex = props.open ? 1 : 0;
      if (allModals.length > currentModalIndex) {
        const currentModal =
          allModals[allModals.length - (currentModalIndex + 1)];
        if (currentModal !== presentationRef.current) {
          currentModal?.toggleAttribute('inert', props.open);
        }
      } else {
        for (const child of bodyChildren) {
          if (child !== presentationRef.current) {
            child.toggleAttribute('inert', props.open);
          }
        }
      }
    }
  }, [props.open]);

  const handleBackdropClick: MouseEventHandler<HTMLDivElement> = (e) => {
    if (props.closeOnBackdropClick && props.onClose) {
      props.onClose(e);
    }
  };

  return container && props.open
    ? createPortal(
        <div
          className={`reactModal ${styles['root']}`}
          ref={presentationRef}
          role="presentation"
        >
          <div
            aria-hidden={props.open}
            className={styles['backdrop']}
            onClick={handleBackdropClick}
          />
          <div
            aria-hidden={props.open}
            aria-modal="true"
            className={styles['modal']}
            role="dialog"
          >
            {props.children}
          </div>
        </div>,
        container
      )
    : null;
};
