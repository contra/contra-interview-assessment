import { Icon } from '@iconify/react';
import React, { useEffect, useState, useMemo, type FC, useRef } from 'react';
import { createPortal } from 'react-dom';
import { useSpring, animated } from 'react-spring';
import {
  bodyStyle,
  closeButtonStyle,
  headerStyle,
  footerStyle,
  modalStyle,
  overlayVariants,
} from './Modal.css';

type PortalProps = {
  children?: React.ReactNode;
};

const Portal: FC<PortalProps> = ({ children }) => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);

    return () => setMounted(false);
  }, []);

  return mounted ? createPortal(children, document.body) : null;
};

type ModalProps = {
  children?: React.ReactNode;
  onCancel?: () => void;
  onOk?: () => void;
  title?: string;
  visible: boolean;
};

const Modal: FC<ModalProps> = ({
  title,
  visible,
  children,
  onOk,
  onCancel,
}: ModalProps) => {
  const [loaded, setLoaded] = useState(visible);
  const [opened, setOpened] = useState(visible);
  const [modalVisible, setModalVisible] = useState(visible);
  const modalElmRef = useRef<HTMLDivElement | null>(null);
  const labelledBy = useMemo(
    () => (title ? title : `modal_${Date.now()}`),
    [title]
  );

  const overlayStyle = useSpring({
    config: {
      duration: 100,
    },
    onRest: () => {
      if (opened) {
        setModalVisible(true);
      }
    },
    opacity: opened ? 1 : 0,
  });
  const modalAnimationStyle = useSpring({
    ...(modalVisible
      ? { opacity: 1, scale: 1, y: 0 }
      : { opacity: 0, scale: 0.9, y: 20 }),
    onRest: () => {
      if (!modalVisible) {
        setOpened(false);
      }
    },
  });

  const closeModal = () => {
    setModalVisible(false);
    onCancel?.();
  };

  useEffect(() => {
    if (loaded && modalElmRef.current) {
      const elms = Array.from(
        modalElmRef.current.querySelectorAll(
          `select, input, textarea, button, a`
        )
      ).filter((elm) => {
        const style = window.getComputedStyle(elm);
        return (
          style.getPropertyValue(`display`) !== `none` &&
          style.getPropertyValue(`visibility`) !== `hidden`
        );
      });
      if (elms.length > 0) {
        const firstElm = elms[0] as HTMLElement;
        const lastElm = elms[elms.length - 1] as HTMLElement;
        const onFirstElmKeyDown = (event: KeyboardEvent) => {
          if (event.key === `Tab` && event.shiftKey) {
            event.preventDefault();
            lastElm.focus();
          }
        };

        const onLastElmKeyDown = (event: KeyboardEvent) => {
          if (event.key === `Tab` && !event.shiftKey) {
            event.preventDefault();
            firstElm.focus();
          }
        };

        firstElm.addEventListener(`keydown`, onFirstElmKeyDown);
        lastElm.addEventListener('keydown', onLastElmKeyDown);

        return () => {
          firstElm.removeEventListener(`keydown`, onFirstElmKeyDown);
          lastElm.removeEventListener(`keydown`, onLastElmKeyDown);
        };
      }
    } else {
      setLoaded(true);
    }
  }, [modalElmRef, loaded]);

  useEffect(() => {
    if (visible) {
      setOpened(true);
    }
  }, [visible]);

  return (
    <Portal>
      <animated.div
        className={overlayVariants[opened ? 'visible' : 'hidden']}
        style={overlayStyle}
        tabIndex={-1}
      >
        <animated.div
          aria-labelledby={labelledBy}
          aria-modal
          className={modalStyle}
          ref={modalElmRef}
          role="dialog"
          style={modalAnimationStyle}
        >
          <div className={headerStyle}>
            {title}
            <button
              aria-label="close"
              className={closeButtonStyle}
              onClick={closeModal}
              type="button"
            >
              <Icon icon="carbon:close" />
            </button>
          </div>
          <div className={bodyStyle}>{children}</div>
          <div className={footerStyle}></div>
        </animated.div>
      </animated.div>
    </Portal>
  );
};

export default Modal;
