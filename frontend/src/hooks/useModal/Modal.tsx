import React, { useState, ReactNode, useEffect } from 'react';
import ReactDOM from 'react-dom';
import {
  ModalCloseButton,
  ModalContainer,
  ModalHeader,
  ModalOverlay,
  ModalWrapper,
} from './Modal.styles';

type OptionsTypes = {
  animated?: boolean;
  closeButton?: boolean;
  title?: string;
  message?: string;
};

interface UseModalReturnType {
  isModalVisible: boolean;
  hide: () => void;
  options?: OptionsTypes;
}

type ModalProps = {
  isModalVisible: boolean;
  hide: () => void;
  options?: OptionsTypes;
  children?: ReactNode;
};

export const Modal = ({
  isModalVisible,
  hide,
  options,
  children,
}: ModalProps) => {
  const isAnimated = options?.animated ? true : false;
  const hasCloseButton = options?.closeButton ? true : false;

  const renderBody = () => {
    if (children) {
      return children;
    }
    if (options && options.message) {
      return <div className="modali-body-style">{options.message}</div>;
    }
    return false;
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
            onClick={hasCloseButton ? () => null : hide}
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
                    onClick={hide}
                  >
                    <span aria-hidden="true">&times;</span>
                  </ModalCloseButton>
                </ModalHeader>
              ) : null}
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
): [UseModalReturnType, () => void] => {
  const [isModalVisible, setIsModalVisible] = useState(false);

  const toggle = () => {
    setIsModalVisible((prevParam) => !prevParam);
  };

  useEffect(() => {
    if (isModalVisible) {
      document.body.style.overflow = 'hidden';
    }
    if (!isModalVisible) {
      document.body.style.removeProperty('overflow');
    }
  }, [isModalVisible]);

  return [{ isModalVisible, hide: toggle, options }, toggle];
};
