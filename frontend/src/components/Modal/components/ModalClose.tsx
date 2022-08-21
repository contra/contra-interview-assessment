import { type ComponentProps, forwardRef } from 'react';
import { isNotUndefined } from '@/utils';
import { useModalContext } from '../hooks/ModalContext';
import { InternalStyledModalClose } from './Modal.styles';

export type ModalCloseProps = ComponentProps<typeof InternalStyledModalClose>;

const ModalClose = forwardRef<HTMLButtonElement, ModalCloseProps>(
  (props, ref) => {
    const { updateModalOpenState } = useModalContext('Close');

    return (
      <InternalStyledModalClose
        ref={ref}
        type="button"
        {...props}
        onClick={(event) => {
          updateModalOpenState(false);
          if (isNotUndefined(props.onClick)) {
            props.onClick(event);
          }
        }}
      >
        {props.children}
      </InternalStyledModalClose>
    );
  }
);

export default ModalClose;
