import React, { type FC } from 'react';
import { button } from './simple-button.css';

type ButtonProps = {
  children?: React.ReactNode;
  htmlType?: 'button' | 'reset' | 'submit';
  type?: 'default' | 'primary';
};

const SimpleButton: FC<ButtonProps & React.HTMLProps<HTMLButtonElement>> = ({
  children,
  type = 'default',
  htmlType = 'button',
  ...rest
}) => {
  return (
    <button className={button({ type })} {...rest} type={htmlType}>
      {children}
    </button>
  );
};

export default SimpleButton;
