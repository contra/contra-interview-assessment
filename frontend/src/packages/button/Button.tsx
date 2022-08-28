import React from 'react';
import styles from './Button.module.css';

type Props = {
  ariaLabel?: string;
  children: React.ReactNode;
  className?: string;
  onClick: () => void;
};

export const Button = (props: Props) => {
  return (
    <button
      aria-label={props.ariaLabel}
      className={styles['button'] + ` ${props.className ?? ''}`}
      onClick={props.onClick}
      type="button"
    >
      {props.children}
    </button>
  );
};
