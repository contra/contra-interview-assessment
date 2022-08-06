import { Icon } from '@iconify/react';
import React, {
  useEffect,
  useState,
  useMemo,
  type FC,
  useRef,
  useCallback,
} from 'react';
import { createPortal } from 'react-dom';
import { useSpring, animated } from 'react-spring';
import SimpleButton from '../SimpleButton';
import {
  bodyStyle,
  closeButtonStyle,
  headerStyle,
  footerStyle,
  modalWrapperVariant,
  modalStyle,
  overlayVariants,
} from './modal.css';

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
  escapable?: boolean;
  maskClosable?: boolean;
  onCancel?: () => void;
  onOk?: () => void;
  title?: string;
  visible: boolean;
};

const Modal: FC<ModalProps> = ({
  title,
  visible,
  children,
  escapable = true,
  maskClosable = true,
  onOk,
  onCancel,
}: ModalProps) => {
  const [loaded, setLoaded] = useState(visible);
  const [opened, setOpened] = useState(visible);
  const [modalVisible, setModalVisible] = useState(visible);
  const modalElmRef = useRef<HTMLDivElement | null>(null);
  const maskElmRef = useRef<HTMLDivElement | null>(null);
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
      } else {
        onCancel?.();
      }
    },
    opacity: opened ? 1 : 0,
  });

  const modalAnimationStyle = useSpring({
    ...(modalVisible
      ? { opacity: 1, scale: 1, y: 0 }
      : { opacity: 0, scale: 0.9, y: 20 }),
    onRest: () => {
      if (modalElmRef.current) {
        modalElmRef.current.focus();
      }
    },
  });

  const closeModal = useCallback(() => {
    setModalVisible(false);
    setOpened(false);
  }, []);

  const onModalClick = (event: React.MouseEvent<HTMLDivElement>) => {
    event.preventDefault();
    event.stopPropagation();
  };

  useEffect(() => {
    const maskElement = maskElmRef.current;
    const onEscape = (event: KeyboardEvent) => {
      event.stopPropagation();
      if (event.key === `Escape`) {
        closeModal();
      }
    };

    const onMaskClick = (event: MouseEvent) => {
      if (maskElement === event.target) {
        event.stopPropagation();
        closeModal();
      }
    };

    if (maskElement && escapable) {
      maskElement.addEventListener(`keydown`, onEscape);
    }

    if (maskElement && maskClosable) {
      maskElement.addEventListener(`click`, onMaskClick);
    }

    return () => {
      if (maskElement) {
        maskElement.removeEventListener(`keydown`, onEscape);
        maskElement.removeEventListener(`click`, onMaskClick);
      }
    };
  }, [maskElmRef, loaded, escapable, maskClosable, closeModal]);

  useEffect(() => {
    let firstElm: HTMLElement | null = null;
    let lastElm: HTMLElement | null = null;
    const onFirstElmKeyDown = (event: KeyboardEvent) => {
      if (event.key === `Tab` && event.shiftKey) {
        event.preventDefault();
        lastElm?.focus();
      }
    };

    const onLastElmKeyDown = (event: KeyboardEvent) => {
      if (event.key === `Tab` && !event.shiftKey) {
        event.preventDefault();
        firstElm?.focus();
      }
    };

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
        firstElm = elms[0] as HTMLElement;
        lastElm = elms[elms.length - 1] as HTMLElement;

        firstElm.addEventListener(`keydown`, onFirstElmKeyDown);
        lastElm.addEventListener('keydown', onLastElmKeyDown);
      }
    } else {
      setLoaded(true);
    }

    return () => {
      if (firstElm && lastElm) {
        firstElm.removeEventListener(`keydown`, onFirstElmKeyDown);
        lastElm.removeEventListener(`keydown`, onLastElmKeyDown);
      }
    };
  }, [modalElmRef, loaded]);

  useEffect(() => {
    if (visible) {
      setOpened(visible);
    }
  }, [visible]);

  useEffect(() => {
    const modals = Array.from(
      document.querySelectorAll(
        `.${overlayVariants.visible.split(` `)[0]} .${
          modalWrapperVariant.active.split(` `)[0]
        }`
      )
    );
    if (opened && modals.length > 1) {
      const modal = modals[modals.length - 2] as HTMLDivElement;
      modal.className = modalWrapperVariant.inactive;
      return;
    }

    const inactiveModals = document.querySelectorAll(
      `.${modalWrapperVariant.inactive.split(` `)[0]}`
    );
    if (!opened && inactiveModals.length > 0) {
      const modal = inactiveModals[inactiveModals.length - 1] as HTMLDivElement;
      modal.className = modalWrapperVariant.active;
    }
  }, [opened]);

  // lock body scrolling when modal is visible
  useEffect(() => {
    if (!loaded) return;
    document.body.style.overflowY = opened ? `hidden` : `auto`;
  }, [loaded, opened]);

  return (
    <Portal>
      <animated.div
        className={overlayVariants[visible ? 'visible' : 'hidden']}
        ref={maskElmRef}
        style={overlayStyle}
        tabIndex={-1}
      >
        <div className={modalWrapperVariant.active}>
          <animated.div
            aria-labelledby={labelledBy}
            aria-modal
            className={modalStyle}
            onClick={onModalClick}
            ref={modalElmRef}
            role="dialog"
            style={modalAnimationStyle}
            tabIndex={0}
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
            <div className={footerStyle}>
              <SimpleButton onClick={closeModal}>Cancel</SimpleButton>
              <SimpleButton onClick={onOk} type="primary">
                OK
              </SimpleButton>
            </div>
          </animated.div>
        </div>
      </animated.div>
    </Portal>
  );
};

export default Modal;
