import {
  forwardRef,
  useId,
  useEffect,
  type ReactNode,
  type ComponentProps,
} from 'react';
import { isNotUndefined } from '@/utils';
import { useModalContext } from '../hooks/ModalContext';
import { InternalStyledModalTitle } from './Modal.styles';

export type ModalTitleProps = ComponentProps<
  typeof InternalStyledModalTitle
> & { children: ReactNode };

const ModalTitle = forwardRef<HTMLHeadingElement, ModalTitleProps>(
  (props, ref) => {
    const reactId = useId();
    const { id: idFromProps, ...otherProps } = props;
    const prefix = 'modal-title-';
    const titleId = isNotUndefined(idFromProps)
      ? idFromProps
      : `${prefix}${reactId}`;

    const { setTitleId } = useModalContext('Title');

    useEffect(() => {
      setTitleId(titleId);
    }, [titleId, setTitleId]);

    return (
      <InternalStyledModalTitle {...otherProps} id={titleId} ref={ref}>
        {props.children}
      </InternalStyledModalTitle>
    );
  }
);

export default ModalTitle;
