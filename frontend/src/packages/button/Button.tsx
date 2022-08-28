import React from 'react';
import styles from './Button.module.css';

type Props = {
  ariaLabel?: string;
  children: React.ReactNode;
  onClick: () => void;
  variant?: 'icon';
};

export const Button = (props: Props) => {
  return (
    <button
      aria-label={props.ariaLabel}
      className={
        styles['button'] +
        (props.variant === 'icon' ? ` ${styles['iconButton']}` : '')
      }
      onClick={props.onClick}
      type="button"
    >
      {props.children}
    </button>
  );
};
