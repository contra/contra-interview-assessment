import styles from './Button.module.css';

const Button = ({
  children,
  onClick,
}: {
  children: JSX.Element | string;
  onClick: () => void;
}) => {
  return (
    <button className={styles['Button']} onClick={onClick} type="button">
      {children}
    </button>
  );
};

export default Button;
