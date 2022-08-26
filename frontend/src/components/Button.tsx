import { styles } from '../styles';
import { ReactNode } from 'react';

type ButtonProps = {
  children: ReactNode;
  [key: string]: any;
};

export default function Button({ children, ...props }: ButtonProps) {
  return (
    <button style={styles['button']} {...props}>
      {children}
    </button>
  );
}
