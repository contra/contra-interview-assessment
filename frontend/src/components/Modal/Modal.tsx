import React from 'react';
import FocusLock from 'react-focus-lock';
import { RemoveScroll } from 'react-remove-scroll';
import {
  ModalBody,
  IconButton,
  ModalFooter,
  ModalHeader,
  ModalContent,
  ModalContainer,
} from '@/components/Modal/Modal.styles';
import useModal from '@/components/Modal/useModal';
import useModalElementsIds from '@/components/Modal/useModalElementsIds';
import Portal from '@/components/Portal';
import { MODAL_PORTAL_ID } from '@/pages/_document';

export type ModalContextType = {
  bodyId?: string;
  headerId?: string;
  onClose: () => void;
} | null;

export type ModalSize = 'full' | 'lg' | 'md' | 'sm' | 'xl' | 'xs';

const modalSizes: Record<ModalSize, number> = {
  full: 100,
  lg: 40,
  md: 30,
  sm: 20,
  xl: 50,
  xs: 15,
};

const ModalContext = React.createContext<ModalContextType>(null);

export type ModalPropsType = {
  children: React.ReactNode;
  /**
   * If true, the modal will close when esc key is pressed
   *
   * @default true
   */
  closeOnEsc?: boolean;
  /**
   * If true, the modal will close on overlay click
   *
   * @default true
   */
  closeOnOverlayClick?: boolean;
  /**
   * If true, the modal will have a backdrop overlay
   *
   * @default true
   */
  hasOverlay?: boolean;
  isOpen: boolean;
  onClose: () => void;
  /**
   * If true, after the modal closes focus will be returned to the element that opened it.
   *
   * @default true
   */
  returnFocusOnClose?: boolean;
  size?: ModalSize;
};

type ModalComposition = {
  Body: typeof Body;
  CloseButton: typeof CloseButton;
  Footer: typeof Footer;
  Header: typeof Header;
};

const Modal: ModalComposition & React.FC<ModalPropsType> = ({
  size,
  isOpen,
  children,
  hasOverlay = true,
  closeOnEsc = true,
  onClose = () => {},
  returnFocusOnClose = true,
  closeOnOverlayClick = true,
}: ModalPropsType) => {
  const [modalId, headerId, bodyId] = useModalElementsIds(
    `modal`,
    `modal--header`,
    `modal--body`
  );

  const modalContentRef = React.useRef<HTMLDivElement>(null);
  const { contextValue } = useModal({
    bodyId,
    closeOnEsc,
    closeOnOverlayClick,
    headerId,
    isOpen,
    modalContentRef,
    modalId: modalId as string,
    onClose,
  });

  return isOpen ? (
    <Portal portalId={MODAL_PORTAL_ID}>
      <ModalContext.Provider value={contextValue}>
        <ModalContainer hasOverlay={hasOverlay}>
          <FocusLock
            disabled={!isOpen}
            persistentFocus
            returnFocus={returnFocusOnClose}
          >
            <RemoveScroll>
              <ModalContent
                aria-describedby={bodyId}
                aria-labelledby={headerId}
                aria-modal="true"
                id={modalId}
                ref={modalContentRef}
                role="dialog"
                size={modalSizes[size ? size : 'md']}
                tabIndex={-1}
              >
                {children}
              </ModalContent>
            </RemoveScroll>
          </FocusLock>
        </ModalContainer>
      </ModalContext.Provider>
    </Portal>
  ) : null;
};

const useModalContext = () => {
  const context = React.useContext(ModalContext);
  if (!context) {
    throw new Error(
      `useModalContext must be used in or within a Modal Component`
    );
  }

  return context;
};

const CloseButton = React.forwardRef<
  HTMLButtonElement,
  React.ComponentPropsWithoutRef<'button'>
>(({ children, onClick, ...rest }, ref) => {
  const { onClose } = useModalContext();

  const handleClick: React.MouseEventHandler<HTMLButtonElement> = (event) => {
    onClose();
    onClick?.(event);
  };

  return (
    <button
      aria-label="close"
      onClick={handleClick}
      ref={ref}
      type="button"
      {...rest}
    >
      {children}
    </button>
  );
});
CloseButton.displayName = 'CloseButton';

const Header = React.forwardRef<
  HTMLDivElement,
  Omit<React.ComponentPropsWithoutRef<'header'>, 'id'>
>(({ children, ...rest }, ref) => {
  const { headerId, onClose } = useModalContext();
  return (
    <ModalHeader id={headerId} ref={ref} {...rest}>
      {children}
      <IconButton aria-label="close" onClick={onClose} type="button">
        <span aria-hidden="true">&times;</span>
      </IconButton>
    </ModalHeader>
  );
});
Header.displayName = 'Header';

const Body = React.forwardRef<
  HTMLDivElement,
  Omit<React.ComponentPropsWithoutRef<'div'>, 'id'>
>(({ children, ...rest }, ref) => {
  const { bodyId } = useModalContext();
  return (
    <ModalBody id={bodyId} ref={ref} {...rest}>
      {children}
    </ModalBody>
  );
});
Body.displayName = 'Body';

const Footer = React.forwardRef<
  HTMLDivElement,
  React.ComponentPropsWithoutRef<'footer'>
>(({ children, ...rest }, ref) => {
  return (
    <ModalFooter ref={ref} {...rest}>
      {children}
    </ModalFooter>
  );
});

Footer.displayName = 'Footer';

Modal.Body = Body;
Modal.Header = Header;
Modal.Footer = Footer;
Modal.CloseButton = CloseButton;

export default Modal;
