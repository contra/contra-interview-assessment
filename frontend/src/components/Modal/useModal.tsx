import { type RefObject, useMemo } from 'react';
import {
  type ModalContextType,
  type ModalPropsType,
} from '@/components/Modal/Modal';
import { useModalManager } from '@/components/Modal/modal-instances-manager';
import { useAriaHidden, useClickOutside, useEscapeKey } from '@/hooks';
import { MODAL_PORTAL_ID } from '@/pages/_document';

type UseModalTypes = Pick<
  ModalPropsType,
  'closeOnEsc' | 'closeOnOverlayClick' | 'isOpen' | 'onClose'
> &
  Pick<Exclude<ModalContextType, null>, 'bodyId' | 'headerId'> & {
    modalContentRef: RefObject<HTMLElement>;
    modalId: string;
  };

const useModal = ({
  bodyId,
  headerId,
  modalId,
  onClose,
  isOpen,
  closeOnOverlayClick,
  closeOnEsc,
  modalContentRef,
}: UseModalTypes) => {
  const contextValue = useMemo(
    () => ({
      bodyId,
      headerId,
      onClose,
    }),
    [bodyId, headerId, onClose]
  );

  useModalManager(modalId as string, isOpen);
  useAriaHidden(MODAL_PORTAL_ID, isOpen);
  useEscapeKey(modalId, onClose, closeOnEsc);
  useClickOutside(
    onClose,
    modalContentRef,
    modalId as string,
    closeOnOverlayClick
  );

  return { contextValue };
};

export default useModal;
