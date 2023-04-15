import FocusTrap from 'focus-trap-react';
import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Button, ButtonType } from './Button';
import Portal from './Portal';
import { colors } from './theme/colors';
import { Div } from './utils';
import { useCloseOnEscapeKeyDown, useOverlay } from './utils/hooks';

export const ModalContainer = styled(Div)`
  top: 0px;
  left: 0px;
  margin: 0px;
  position: fixed;
  display: flex;
  flex-direction: column;
  align-items: center;
  z-index: 100;
  width: 100vw;
  height: 100vh;
  margin-top: 8vh;
  pointer-events: none;
  div {
    pointer-events: auto;
  }
`;

export const ModalBackdrop = styled(Div)`
  position: fixed;
  top: 0px;
  left: 0px;
  margin: 0px;
  width: 100vw;
  height: 100vh;
  z-index: 100;
  background: ${(props) => props.theme.colors.black};
  opacity: 0.8;
`;

export const ModalWrapper = styled(Div)`
  background: ${(props) => props.theme.colors.white};
  padding: 38px 40px;
  border-radius: 8px;
  box-shadow: 0 0 24px 0 rgba(0, 0, 0, 0.1);
  overflow-y: auto;
  max-height: 80vh;
  margin-bottom: 100px;
  ${(props) => props.theme.mediaQueries.mobile} {
    width: 82vw;
    padding: 30px;
  }
  ${(p) => p.theme.css.scrollbarDark};
`;

export const ModalCloseIcon = styled.button`
  height: 0;
  display: flex;
  margin: -20px;
  height: 30px;
  width: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: row-reverse;
  // remove all button styles
  background: none;
  border: none;
`;

const ModalTypes = ['small', 'medium', 'large'] as const;
export type ModalType = typeof ModalTypes[number];

type ModalWidths = {
  [K in ModalType]?: any;
};
const modalWidths: ModalWidths = {
  small: 476,
  medium: 676,
  large: 876,
};

type ModalConfirmation = {
  isDisabled?: boolean;
  label?: string;
  variant?: ButtonType;
  onConfirm: () => void;
};

type ModalProps = {
  isOpen?: boolean;
  onClose?: () => void;
  children?: any;
  header?: string;
  variant?: ModalType;
  body?: string;
  withCloseIcon?: boolean;
  withBackdropClose?: boolean;
  className?: string;
  confirmation?: ModalConfirmation;
  isStacked?: boolean;
  shouldCloseOnEscapeKeyDown?: boolean;
};
export const Modal = ({
  isOpen = false,
  onClose = () => {},
  header,
  body,
  variant = 'small',
  children,
  withCloseIcon = true,
  withBackdropClose = true,
  className = '',
  confirmation,
  isStacked = false,
  shouldCloseOnEscapeKeyDown = true,
}: ModalProps) => {
  useOverlay(isOpen, isStacked);
  useCloseOnEscapeKeyDown(onClose, shouldCloseOnEscapeKeyDown);

  // This is a hack to fix FocusTrap issue
  const [isModalActive, setIsModalActive] = useState(false);
  useEffect(() => {
    setIsModalActive(isOpen);
  }, [isOpen]);

  const headerUI = (
    <Div spaceBetween>
      <Div h2 mr={12} id="modal-header">
        {header}
      </Div>
      {withCloseIcon && (
        <ModalCloseIcon tabIndex={0} onClick={onClose} aria-label="Close Modal">
          <Div clickable c={colors.black60}>
            {closeIcon}
          </Div>
        </ModalCloseIcon>
      )}
    </Div>
  );

  const confirmationUI = confirmation && (
    <Div justifyEnd mt={32}>
      <Div dflex>
        <Button w={82} variant="tertiary" onClick={onClose} aria-label="Cancel">
          Cancel
        </Button>
        <Button
          isDisabled={!!confirmation?.isDisabled || false}
          variant={confirmation.variant}
          ml={20}
          dInline
          onClick={() => {
            confirmation?.onConfirm();
            onClose();
          }}
          aria-label={confirmation.label || 'Confirm'}
        >
          {confirmation.label || 'Confirm'}
        </Button>
      </Div>
    </Div>
  );

  return (
    <>
      {isOpen && (
        <Portal>
          <FocusTrap active={isModalActive}>
            <Div
              className={className}
              role="dialog"
              aria-modal="true"
              aria-labelledby="modal-header"
            >
              <ModalBackdrop
                onClick={() => {
                  if (withBackdropClose) onClose();
                }}
              />
              <ModalContainer>
                <ModalWrapper w={modalWidths[variant]}>
                  {headerUI}
                  <Div>
                    {body && (
                      <Div body1 mt={20}>
                        {body}
                      </Div>
                    )}
                    {children}
                  </Div>
                  {confirmationUI}
                </ModalWrapper>
              </ModalContainer>
            </Div>
          </FocusTrap>
        </Portal>
      )}
    </>
  );
};

const closeIcon = (
  <svg
    width={24}
    height={24}
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M6.61289944,5.20970461 L6.70710678,5.29289322 L12,10.585 L17.2928932,5.29289322 L17.3871006,5.20970461 C17.7793918,4.90467972 18.3466228,4.93240926 18.7071068,5.29289322 C19.0675907,5.65337718 19.0953203,6.22060824 18.7902954,6.61289944 L18.7071068,6.70710678 L13.415,12 L18.7071068,17.2928932 C19.0976311,17.6834175 19.0976311,18.3165825 18.7071068,18.7071068 C18.3466228,19.0675907 17.7793918,19.0953203 17.3871006,18.7902954 L17.2928932,18.7071068 L12,13.415 L6.70710678,18.7071068 L6.61289944,18.7902954 C6.22060824,19.0953203 5.65337718,19.0675907 5.29289322,18.7071068 C4.93240926,18.3466228 4.90467972,17.7793918 5.20970461,17.3871006 L5.29289322,17.2928932 L10.585,12 L5.29289322,6.70710678 C4.90236893,6.31658249 4.90236893,5.68341751 5.29289322,5.29289322 C5.65337718,4.93240926 6.22060824,4.90467972 6.61289944,5.20970461 Z"
      fill="currentColor"
      fillRule="nonzero"
      stroke="none"
      strokeWidth={1}
    />
  </svg>
);
