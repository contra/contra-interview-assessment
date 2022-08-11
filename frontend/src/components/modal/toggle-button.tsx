/* eslint-disable canonical/filename-match-exported */
import { forwardRef, useEffect } from 'react';
import { Btn } from '../../styles/buttons';

const ModalToggleButton = forwardRef(
  (
    { id, label, handleToggle, modalRef, targetModal, theme, size, children },
    ref
  ) => {
    const colorMode = theme ? theme : 'light';
    const btnSize = size ? size : 'reg';

    return (
      <Btn
        ref={ref}
        type="button"
        id={id}
        onClick={handleToggle}
        aria-label={label}
        mode={colorMode}
        size={btnSize}
        data-modal={targetModal}
      >
        {children}
      </Btn>
    );
  }
);

export default ModalToggleButton;
