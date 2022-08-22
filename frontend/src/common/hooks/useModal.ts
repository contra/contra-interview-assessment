import {useRef, useCallback, useEffect} from 'react';

import { noop } from '../utils/noop';
import useHotKeys from './useHotKeys';
import { manager } from '../Modal/ModalManager';
import { useModalProps } from '../Modal/Modal.types';
import { focusElementsInModal } from '../utils/focusable';
import useCloseOnOutsideClick from './useCloseOnOutsideClick';

export const useModal = (
  {
    isOpen,
    initialFocusRef,
    finalFocusRef,
    dialogRef,
    onClose,
    backdropRef,
    closeOnOutsideClick,
    closeOnEsc,
    blockScrollOnMount,
  } : useModalProps) => {

  const autoFocusPreviousFocusableRef = useRef<HTMLElement | null>(null)
  const elementToFocusRef = useRef<HTMLElement | null>(null);

  const returnFocusToPreviousActiveElement = () => {
    if (finalFocusRef?.current) {
      finalFocusRef.current.focus();
      manager.manageFinalFocus()
    } else {
      elementToFocusRef.current = manager.manageFinalFocus();
      if(elementToFocusRef.current) elementToFocusRef.current.focus();
    }
  }

  const focusRequiredElementInModal = () => {
    if(initialFocusRef?.current){
      initialFocusRef.current.focus();
      focusElementsInModal(dialogRef, false);
    } else focusElementsInModal(dialogRef, true)
  }

  const close = () => {
    if (!manager.isTopModal(dialogRef)) return;
      returnFocusToPreviousActiveElement();
      onClose?.()
  }

  const handleModalClose = useCallback(
    (event?: React.MouseEvent | React.KeyboardEvent) => {
      event && event.stopPropagation();
      close();
    },
    [onClose],
  )

useCloseOnOutsideClick(
    dialogRef,
    backdropRef,
    closeOnOutsideClick ? handleModalClose : noop
  );

useHotKeys({
    key: "Escape",
    action: closeOnEsc ? handleModalClose : noop,
  })

  const getScrollbarWidth = () => {
    const parentDiv = document.createElement('div');
    parentDiv.style.visibility = 'hidden';
    parentDiv.style.overflow = 'scroll';
    document.body.appendChild(parentDiv);
    const childDiv = document.createElement('div');
    parentDiv.appendChild(childDiv);
    const scrollbarWidth = (parentDiv.offsetWidth - childDiv.offsetWidth);
    parentDiv?.parentNode?.removeChild(parentDiv);
    return scrollbarWidth;
  }

  useEffect(() => {
    if (isOpen) {
      if(typeof window === "object"){
        autoFocusPreviousFocusableRef.current = document.activeElement as HTMLElement;
      }
      focusRequiredElementInModal();
    }
    if (blockScrollOnMount && manager.hasModals()) {
      document.body.style.paddingRight = getScrollbarWidth() + 'px';
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.paddingRight = '0px';
      document.body.style.overflow = "auto";
    }
  } , [manager.modals]);

  useEffect(() => {
    if (!isOpen) {
      close();
    }
  } , [isOpen]);

  return {
    handleModalClose,
  }
}