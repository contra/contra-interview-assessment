import {
  type ComponentProps,
  forwardRef,
  useId,
  useEffect,
  type ReactNode,
} from 'react';
import { isNotUndefined } from '@/utils';
import { useModalContext } from '../hooks/ModalContext';
import { InternalStyledModalDescription } from './Modal.styles';

export type ModalDescriptionProps = ComponentProps<
  typeof InternalStyledModalDescription
> & { as?: keyof JSX.IntrinsicElements; children: ReactNode };

const ModalDescription = forwardRef<HTMLHeadingElement, ModalDescriptionProps>(
  (props, ref) => {
    const reactId = useId();
    const { id: idFromProps, ...otherProps } = props;
    const prefix = 'modal-description-';
    const descriptorId = isNotUndefined(idFromProps)
      ? idFromProps
      : `${prefix}${reactId}`;

    const { setDescriptorId } = useModalContext('Description');

    useEffect(() => {
      setDescriptorId(descriptorId);
    }, [descriptorId, setDescriptorId]);

    return (
      <InternalStyledModalDescription
        {...otherProps}
        id={descriptorId}
        ref={ref}
      >
        {props.children}
      </InternalStyledModalDescription>
    );
  }
);

export default ModalDescription;
