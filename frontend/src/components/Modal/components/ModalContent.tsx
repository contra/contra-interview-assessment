import {
  type ComponentProps,
  type MutableRefObject,
  type DetailedHTMLProps,
  type HTMLAttributes,
  type ReactNode,
  forwardRef,
  useState,
  useCallback,
  useRef,
  useEffect,
  useId,
} from 'react';
import { useMergeRefs } from '@/hooks/useMergeReferences';
import useOutsideClick, {
  type MouseOrTouchEvent,
} from '@/hooks/useOutsideClick';
import { useScrollLock } from '@/hooks/useScrollLock';
import { focusElement, getTabbableChildItems, isNotUndefined } from '@/utils';
import Portal from '../../Portal/Portal';
import { modalStack } from '../ModalStack';
import { useModalContext } from '../hooks/ModalContext';
import {
  InternalStyledModalContent,
  InternalStyledModalOverlay,
} from './Modal.styles';

export type ModalContentProps = ComponentProps<
  typeof InternalStyledModalContent
> & {
  children: ReactNode;
};

const ModalContent = forwardRef<HTMLDivElement, ModalContentProps>(
  (props, ref) => {
    const { children, ...others } = props;
    const {
      isModalOpen,
      updateModalOpenState,
      titleId,
      descriptorId,
      setDescriptorId,
      disablePortal,
      firstFocusElementRef,
      triggerRef,
      dataState,
      shouldCloseOnInteractOutside,
      shouldShowOverlay,
    } = useModalContext('Content');

    const [node, setNode] = useState<HTMLDivElement | null>(null);

    const closeModal = useCallback(
      () => updateModalOpenState(false),
      [updateModalOpenState]
    );
    const [isModalAtTop, setIsModalAtTop] = useState(false);

    const lastFocusedElementRef = useRef<HTMLElement | null>(null);

    const handleOutsideClick = useCallback(
      (event: MouseOrTouchEvent) => {
        if (!node || !modalStack.isAtTop(node)) return;
        if (shouldCloseOnInteractOutside) {
          event.preventDefault();
          closeModal();
        }
      },
      [shouldCloseOnInteractOutside, closeModal, node]
    );

    const outsideClickRef = useOutsideClick<HTMLDivElement>(handleOutsideClick);

    const mergedRootRef = useMergeRefs<HTMLDivElement>(
      (elementNode) => setNode(elementNode),
      outsideClickRef,
      ref
    ) as MutableRefObject<HTMLDivElement>;

    const { lockScroll: lockBodyScroll, unlockScroll: unlockBodyScroll } =
      useScrollLock();

    const rootDialogProps: DetailedHTMLProps<
      HTMLAttributes<HTMLDivElement>,
      HTMLDivElement
    > & {
      'data-level'?: number;
      'data-state': string;
      ref: MutableRefObject<HTMLDivElement>;
    } = {
      'aria-describedby': descriptorId,
      'aria-labelledby': titleId,
      'data-state': dataState,
      ...others,
      'aria-modal': true,
      ref: mergedRootRef,
      role: 'dialog',
      tabIndex: -1,
    };

    const descriptorIdFromContent = useId();

    useEffect(() => {
      if (!node) return;
      const unsubscribe = modalStack.onTopChange((item) => {
        if (item === node) {
          setIsModalAtTop(true);
        } else {
          setIsModalAtTop(false);
        }
      });

      modalStack.add(node);

      // eslint-disable-next-line consistent-return
      return () => {
        modalStack.remove(node);
        unsubscribe();
      };
    }, [node]);

    /**
     * This useEffect handles the case where the focus is shifted programatically
     * For e.x. If the tab is switched or window is refocussed
     */
    useEffect(() => {
      if (!node) return;
      const handleFocusIn = (event: FocusEvent) => {
        if (!isNotUndefined(node) || !modalStack.isAtTop(node)) return;
        const target = event.target as HTMLElement | null;
        if (node.contains(target)) {
          lastFocusedElementRef.current = target;
        } else {
          focusElement(lastFocusedElementRef.current, true);
        }
      };

      const handleFocusOut = (event: FocusEvent) => {
        if (!isNotUndefined(node) || !modalStack.isAtTop(node)) return;
        if (!node.contains(event.relatedTarget as HTMLElement | null)) {
          focusElement(lastFocusedElementRef.current, true);
        }
      };

      document.addEventListener('focusin', handleFocusIn);
      document.addEventListener('focusout', handleFocusOut);

      // eslint-disable-next-line consistent-return
      return () => {
        document.removeEventListener('focusin', handleFocusIn);
        document.removeEventListener('focusout', handleFocusOut);
      };
    }, [node]);

    /**
     * This useEffect block takes care of focussing on appropriate element when the modal mounts/unmounts
     * and it follows ARIA specification reference to the specs: https://www.w3.org/WAI/ARIA/apg/patterns/dialogmodal/
     */
    useEffect(() => {
      if (!node) return;

      const triggerElement = triggerRef?.current;
      const previouslyFocusedElement = document.activeElement as HTMLElement;
      const isCurrentlyFocussedElementInsideFocusTrapContainer = node.contains(
        previouslyFocusedElement
      );

      if (!isCurrentlyFocussedElementInsideFocusTrapContainer) {
        if (firstFocusElementRef?.current) {
          const firstFocusElement = firstFocusElementRef.current;
          const descriptorIdTobeSet =
            // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
            firstFocusElement.id || descriptorIdFromContent;
          firstFocusElementRef.current.id = descriptorIdTobeSet;
          setDescriptorId(descriptorIdTobeSet);
          firstFocusElement.tabIndex = -1;
          focusElement(firstFocusElement, true);
        } else {
          const { 0: firstTabbableItem } = getTabbableChildItems(node);
          focusElement(firstTabbableItem, true);
        }

        if (document.activeElement === previouslyFocusedElement) {
          focusElement(node);
        }
      }

      // eslint-disable-next-line consistent-return
      return () => {
        if (isNotUndefined(triggerElement)) {
          focusElement(triggerElement, true);
        } else {
          focusElement(previouslyFocusedElement, true);
        }
      };
    }, [
      node,
      triggerRef,
      firstFocusElementRef,
      descriptorIdFromContent,
      setDescriptorId,
    ]);

    useEffect(() => {
      const handleKeyDown = (event: KeyboardEvent) => {
        if (!node || !modalStack.isAtTop(node)) return;

        const focussedElement = document.activeElement as HTMLElement;
        const isTabKeyPressed =
          event.key === 'Tab' &&
          !event.metaKey &&
          !event.altKey &&
          !event.ctrlKey;
        const { shiftKey } = event;
        const isEscapeKeyPressed = event.key === 'Escape';

        const {
          0: firstTabbableItem,
          length,
          [length - 1]: lastTabbableItem,
        } = getTabbableChildItems(node);

        if (isTabKeyPressed) {
          if (length === 0) {
            focusElement(node);
            event.preventDefault();
            return;
          } else if (shiftKey && focussedElement === firstTabbableItem) {
            event.preventDefault();
            focusElement(lastTabbableItem, true);
          } else if (!shiftKey && focussedElement === lastTabbableItem) {
            event.preventDefault();
            focusElement(firstTabbableItem, true);
          }
        }

        if (isEscapeKeyPressed) {
          event.preventDefault();
          closeModal();
        }
      };

      document.addEventListener('keydown', handleKeyDown);
      return () => {
        document.removeEventListener('keydown', handleKeyDown);
      };
    }, [closeModal, node]);

    useEffect(() => {
      if (isModalOpen) {
        lockBodyScroll();
      }

      return () => {
        unlockBodyScroll();
      };
    }, [isModalOpen, lockBodyScroll, unlockBodyScroll]);

    useEffect(() => {
      if (node) {
        // eslint-disable-next-line no-negated-condition
        if (!isModalAtTop) {
          node.style.pointerEvents = 'none';
        } else {
          node.style.pointerEvents = 'auto';
        }
      }

      return () => {
        if (node) {
          node.style.pointerEvents = 'auto';
        }
      };
    }, [node, isModalAtTop]);

    if (!isModalOpen) {
      return null;
    }

    if (disablePortal) {
      return (
        <>
          {shouldShowOverlay && <InternalStyledModalOverlay />}
          <InternalStyledModalContent {...rootDialogProps}>
            {children}
          </InternalStyledModalContent>
        </>
      );
    }

    return (
      <Portal>
        {shouldShowOverlay && <InternalStyledModalOverlay />}
        <InternalStyledModalContent {...rootDialogProps}>
          {children}
        </InternalStyledModalContent>
      </Portal>
    );
  }
);

export default ModalContent;
