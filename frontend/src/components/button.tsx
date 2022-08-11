/* eslint-disable canonical/filename-match-exported */
import { forwardRef } from 'react';
import { Btn } from '../styles/buttons';

const Button = forwardRef(
  ({  id, handleClick, label, theme, size, children }, ref) => {
    const colorMode = theme ? theme : 'light';
    const btnSize = size ? size : 'reg';
    return (
      <Btn
        ref={ref}
        type="button"
        id={id}
        onClick={handleClick}
        aria-label={label}
        mode={colorMode}
        size={btnSize}
      >
        {children}
      </Btn>
    );
  }
);

export default Button;
