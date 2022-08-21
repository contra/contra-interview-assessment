import FocusTrap from 'focus-trap-react';
import React, {
  forwardRef,
  useCallback,
  useImperativeHandle,
  useRef,
  useState,
} from 'react';
import { useEscapeKeyPressed } from '@/hooks/useEscapeKeyPressed';
import { useOutsideClick } from '@/hooks/useOutsideClick';
import { useRemoveScrollWhenModalOpen } from '@/hooks/useRemoveScrollWhenModalOpen';
import { Button } from '../Button';
import { Portal } from '../Portal';
import styles from './style.module.css';

type ModalProps = {
  children?: React.ReactNode;
  title?: string;
};

export type ModalHandles = {
  openModal: () => void;
};

export const Modal = forwardRef<ModalHandles, ModalProps>(
  ({ children, title }, ref) => {
    const [visible, setVisible] = useState(false);
    const overlayRef = useRef<HTMLDivElement>(null);

    const openModal = useCallback(() => {
      setVisible(true);
    }, []);

    const closeModal = useCallback(() => {
      setVisible(false);
    }, []);

    // Passing function from children to parent through ref
    useImperativeHandle(ref, () => {
      return { openModal };
    });

    useRemoveScrollWhenModalOpen(visible);
    useEscapeKeyPressed(closeModal);
    useOutsideClick(closeModal, overlayRef);

    if (!visible) return null;
    return (
      <Portal selector="#portal">
        <div className={styles['modalOverlay']}>
          <FocusTrap>
            <div className={styles['modal']} ref={overlayRef} role="dialog">
              <div className={styles['modalHeader']}>
                <h4 className={styles['modalTitle']}>{title}</h4>
                <button
                  aria-label="close"
                  className={styles['closeButton']}
                  onClick={closeModal}
                  type="button"
                >
                  X
                </button>
              </div>
              <hr />
              {children}
              <hr />
              <div className={styles['modalFooter']}>
                <Button onClick={closeModal} text="Cancel" />
                <Button onClick={closeModal} text="Ok" />
              </div>
            </div>
          </FocusTrap>
        </div>
      </Portal>
    );
  }
);
