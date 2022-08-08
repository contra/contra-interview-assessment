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
  modalWrapperStyle,
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
  animate?: boolean;
  cancelButtonText?: string;
  children?: React.ReactNode;
  destroyOnClose?: boolean;
  escapable?: boolean;
  footer?: React.ReactNode;
  header?: React.ReactNode;
  maskClosable?: boolean;
  okButtonText?: string;
  onCancel?: () => void;
  onOk?: () => void;
  title?: string;
  visible: boolean;
  width?: string;
};

const Modal: FC<ModalProps> = ({
  animate = true,
  title,
  visible,
  children,
  destroyOnClose = false,
  escapable = true,
  footer,
  header,
  maskClosable = true,
  okButtonText = `OK`,
  cancelButtonText = `Cancel`,
  onOk,
  onCancel,
  width,
}: ModalProps) => {
  const [destroyed, setDestroyed] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const [opened, setOpened] = useState(visible);
  const [maskVisible, setMaskVisible] = useState(visible);
  const [modalVisible, setModalVisible] = useState(visible);
  const modalElmRef = useRef<HTMLDivElement | null>(null);
  const maskElmRef = useRef<HTMLDivElement | null>(null);
  const label = useMemo(() => (title ? title : `modal_${Date.now()}`), [title]);

  const overlayStyle = useSpring({
    config: {
      duration: animate ? 100 : 0,
    },
    onRest: () => {
      if (opened) {
        setModalVisible(true);
      } else {
        if (maskElmRef.current) {
          const level = Number.parseInt(
            maskElmRef.current.getAttribute(`aria-level`) ?? `0`,
            10
          );
          maskElmRef.current.style.zIndex = `9999`;
          maskElmRef.current.setAttribute(`aria-level`, `1`);
          if (level) {
            const previousMask = document.querySelector(
              `.${overlayVariants.visible.split(` `)[0]}.inactive[aria-level="${
                level - 1
              }"]`
            );
            if (previousMask) {
              previousMask.classList.remove(`inactive`);
            }
          }
        }

        setMaskVisible(false);

        if (destroyOnClose) {
          setDestroyed(true);
        }

        onCancel?.();
      }
    },
    onStart: () => {
      if (opened && maskElmRef.current) {
        Array.from(
          document.querySelectorAll(`.${overlayVariants.visible.split(` `)[0]}`)
        )
          .filter((elm) => elm !== maskElmRef.current)
          .forEach((elm) => elm.classList.add(`inactive`));
      }

      /* 
        make sure that no matter where the modal is placed in the dom that it shows up
        in the correct order in the stack when opened
      */
      const visibleMasks = Array.from(
        document.querySelectorAll(`.${overlayVariants.visible.split(` `)[0]}`)
      );
      if (visibleMasks.length > 1 && maskElmRef.current) {
        maskElmRef.current.setAttribute(`aria-level`, `${visibleMasks.length}`);
        const zIndexArray = visibleMasks.map((mask) => {
          const style = window.getComputedStyle(mask);
          return Number.parseInt(style.zIndex, 10);
        });
        zIndexArray.sort((a, b) => (a > b ? -1 : 1));
        maskElmRef.current.style.zIndex = zIndexArray[0]
          ? `${zIndexArray[0] + 1}`
          : `9999`;
      }
    },
    opacity: opened ? 1 : 0,
  });

  const modalAnimationStyle = useSpring({
    ...(modalVisible
      ? { opacity: 1, scale: 1, y: 0 }
      : { opacity: 0, scale: 0.9, y: 20 }),
    config: {
      duration: animate ? 200 : 0,
    },
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
      document.addEventListener(`keydown`, onEscape);
    }

    if (maskElement && maskClosable) {
      document.addEventListener(`click`, onMaskClick);
    }

    return () => {
      document.removeEventListener(`keydown`, onEscape);
      document.removeEventListener(`click`, onMaskClick);
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
      setOpened(true);
      setDestroyed(false);
      setMaskVisible(true);
    } else {
      closeModal();
    }
  }, [visible, closeModal]);

  // lock body scrolling when modal is visible
  useEffect(() => {
    if (!loaded) return;
    document.body.style.overflowY = opened ? `hidden` : `auto`;
  }, [loaded, opened]);

  if (destroyed) return null;

  return (
    <Portal>
      <animated.div
        aria-level={1}
        className={`${
          overlayVariants[maskVisible ? 'visible' : 'hidden']
        } active`}
        data-testid="mask"
        ref={maskElmRef}
        style={overlayStyle}
        tabIndex={-1}
      >
        <div className={modalWrapperStyle} style={{ width }}>
          <animated.div
            aria-label={label}
            aria-modal
            className={modalStyle}
            onClick={onModalClick}
            ref={modalElmRef}
            role="dialog"
            style={modalAnimationStyle}
            tabIndex={0}
          >
            {header ?? (
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
            )}
            <div className={bodyStyle}>{children}</div>
            {footer ?? (
              <div className={footerStyle}>
                <SimpleButton onClick={closeModal}>
                  {cancelButtonText}
                </SimpleButton>
                <SimpleButton onClick={onOk} type="primary">
                  {okButtonText}
                </SimpleButton>
              </div>
            )}
          </animated.div>
        </div>
      </animated.div>
    </Portal>
  );
};

export default Modal;
