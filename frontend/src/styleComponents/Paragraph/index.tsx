import React from 'react';
import { ESystemColor } from '@/styles/ESystemColor';
import styles from './Paragraph.module.css';

type TProps = {
  children: JSX.Element | string;
  color?: ESystemColor;
};

export const Paragraph: React.FC<TProps> = ({
  children,
  color = ESystemColor.white,
}) => {
  return (
    <div className={styles['Paragraph']}>
      <p style={{ color }}>{children}</p>
    </div>
  );
};
