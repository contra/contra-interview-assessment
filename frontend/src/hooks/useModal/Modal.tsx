import React, { useState, ReactNode, useEffect } from 'react';
import ReactDOM from 'react-dom';
import {
  ModalCloseButton,
  ModalContainer,
  ModalHeader,
  ModalOptionsTitle,
  ModalOptionsMessage,
  ModalOverlay,
  ModalWrapper,
  ModalOptionsButtonGroup,
} from './Modal.styles';

type OptionsTypes = {
  animated?: boolean;
  closeButton?: boolean;
  title?: string;
  message?: string;
  icon?: JSX.Element;
  buttons?: JSX.Element[];
};

interface UseModalReturnType {
  isModalVisible: boolean;
  isNestedModalVisible: boolean;
  hide: () => void;
  hideNested: () => void;
  options?: OptionsTypes;
}

type ModalProps = {
  isModalVisible: boolean;
  isNestedModalVisible: boolean;
  hide: () => void;
  hideNested: () => void;
  nestedModal?: JSX.Element;
  options?: OptionsTypes;
  children?: ReactNode;
};

export const Modal = ({
  isModalVisible,
  isNestedModalVisible,
  hide,
  hideNested,
  nestedModal,
  options,
  children,
}: ModalProps) => {
  const isAnimated = options?.animated ? true : false;
  const hasCloseButton = options?.closeButton ? true : false;

  const renderBody = () => {
    if (isNestedModalVisible && nestedModal) return nestedModal;
    if (children) return children;

    return (
      <>
        {options?.title && (
          <ModalOptionsTitle>{options.title}</ModalOptionsTitle>
        )}
        {options?.message && (
          <ModalOptionsMessage>{options.message}</ModalOptionsMessage>
        )}
        {options?.buttons && (
          <ModalOptionsButtonGroup>
            {options.buttons.map((button) => (
              <React.Fragment>{button}</React.Fragment>
            ))}
          </ModalOptionsButtonGroup>
        )}
      </>
    );
  };

  const hideModals = () => {
    if (isNestedModalVisible) {
      hideNested();
      hide();
    } else {
      hide();
    }
  };

  return isModalVisible
    ? ReactDOM.createPortal(
        <React.Fragment>
          <ModalOverlay animated={isAnimated} />
          <ModalWrapper
            aria-modal
            aria-hidden
            tabIndex={-1}
            role="dialog"
            onClick={hasCloseButton ? () => null : hideModals}
            animated={isAnimated}
          >
            <ModalContainer
              animated={isAnimated}
              onClick={(e) => e.stopPropagation()}
            >
              {options && options.closeButton ? (
                <ModalHeader>
                  <ModalCloseButton
                    type="button"
                    data-dismiss="modal"
                    aria-label="Close"
                    onClick={hideModals}
                  >
                    <span aria-hidden="true">&times;</span>
                  </ModalCloseButton>
                </ModalHeader>
              ) : null}
              {options?.icon}
              {renderBody()}
            </ModalContainer>
          </ModalWrapper>
        </React.Fragment>,
        document.body
      )
    : null;
};

export const useModal = (
  options?: OptionsTypes
): [UseModalReturnType, () => void, () => void] => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isNestedModalVisible, setIsNestedModalVisible] = useState(false);

  const toggle = () => {
    setIsModalVisible((prev) => !prev);
  };

  const toggleNestedModal = () => {
    setIsNestedModalVisible((prev) => !prev);
  };

  useEffect(() => {
    if (isModalVisible) {
      document.body.style.overflow = 'hidden';
    }
    if (!isModalVisible) {
      document.body.style.removeProperty('overflow');
    }
  }, [isModalVisible]);

  return [
    {
      isModalVisible,
      isNestedModalVisible,
      hide: toggle,
      hideNested: toggleNestedModal,
      options,
    },
    toggle,
    toggleNestedModal,
  ];
};
