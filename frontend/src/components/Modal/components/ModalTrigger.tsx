import { forwardRef, type ComponentProps, type RefObject } from 'react';
import Button from '@/components/Button/Button';
import { useMergeRefs } from '@/hooks/useMergeReferences';
import { isNotUndefined } from '@/utils';
import { useModalContext } from '../hooks/ModalContext';

export type ModalTriggerProps = ComponentProps<typeof Button>;

const ModalTrigger = forwardRef<HTMLButtonElement, ModalTriggerProps>(
  (props, ref) => {
    const { triggerRef, updateModalOpenState } = useModalContext('Trigger');

    const mergedButtonRef = useMergeRefs<HTMLButtonElement>(
      triggerRef as RefObject<HTMLButtonElement>,
      ref
    );

    const openModal = () => {
      updateModalOpenState(true);
    };

    return (
      <Button
        {...props}
        onClick={(event) => {
          openModal();
          if (isNotUndefined(props.onClick)) {
            props.onClick(event);
          }
        }}
        ref={mergedButtonRef}
      />
    );
  }
);

export default ModalTrigger;
