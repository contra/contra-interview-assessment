import {
  type ReactNode,
  useState,
  useLayoutEffect,
  useEffect,
  useRef,
  type RefObject,
} from 'react';
import { isNotUndefined } from '@/utils';
import { ModalContextProvider } from '../hooks/ModalContext';

export type ModalRootProps = {
  children: ReactNode;
  /**
   * Determines whether or not a modal should be open by default
   * This has higher priority if `isOpen` is passed as well and would determine the open state on first load
   */
  defaultOpen?: boolean;
  /**
   * If true then the children will be under the DOM hierarchy of the parent component.
   *
   * @default false
   */
  disablePortal?: boolean;
  /**
   * Ref of the first element to focus on, sometimes the first tabbale item might not be the first logical item
   * that the modal should focus on, this is espcially helpful for screen readers where the user should hear the content of modal before going to first action item.
   * Passing this prop automatically manages the focus to that element and sets it as
   * a descriptor to the modal's content.
   */
  firstFocusElementRef?: RefObject<HTMLElement>;
  /**
   * The controlled state of the Modal
   */
  isOpen?: boolean;
  /**
   * Event handler that is called when the Modal's open state changes
   */
  onOpenChange?: (isOpen: boolean) => void;
  /**
   * Determines wether the modal would close if there are touch or click events outside the content container
   *
   * @default false
   */
  shouldCloseOnInteractOutside?: boolean;
  /**
   * Determines wether there is an overlay with the modal
   */
  shouldShowOverlay?: boolean;
};

const ModalRoot = (props: ModalRootProps) => {
  const {
    defaultOpen = false,
    disablePortal,
    firstFocusElementRef,
    isOpen,
    onOpenChange = () => {},
    children,
    shouldShowOverlay = false,
    shouldCloseOnInteractOutside = false,
  } = props;
  const [isModalOpen, setIsModalOpen] = useState(
    isNotUndefined(defaultOpen) ? defaultOpen : Boolean(isOpen)
  );

  const [titleId, setTitleId] = useState('');
  const [descriptorId, setDescriptorId] = useState('');

  const triggerRef = useRef<HTMLElement>(null);

  const dataState = isModalOpen ? 'open' : 'closed';

  // Update the controlled state synchronously
  useLayoutEffect(() => {
    if (isNotUndefined(onOpenChange)) {
      onOpenChange(isModalOpen);
    }
  }, [isModalOpen, onOpenChange]);

  useEffect(() => {
    if (isNotUndefined(isOpen)) {
      setIsModalOpen(isOpen);
    }
  }, [isOpen]);

  return (
    <ModalContextProvider
      value={{
        dataState,
        descriptorId,
        disablePortal,
        firstFocusElementRef,
        isModalOpen,
        setDescriptorId,
        setTitleId,
        shouldCloseOnInteractOutside,
        shouldShowOverlay,
        titleId,
        triggerRef,
        updateModalOpenState: setIsModalOpen,
      }}
    >
      {children}
    </ModalContextProvider>
  );
};

export default ModalRoot;
