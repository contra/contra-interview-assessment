import React from 'react';
import styles from './style.module.css';

type ButtonProps = {
  onClick: (argument?: unknown) => void;
  text: string;
};

export const Button = ({ onClick, text }: ButtonProps) => {
  return (
    <button className={styles['button']} onClick={onClick} type="button">
      {text}
    </button>
  );
};
