import useModal from '../../hooks/useModal';
import styles from './Layout.module.css';

export declare interface LayoutProps {
  children?: React.ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  const { isOpen } = useModal();

  return (
    <main className={styles['main']} {...(isOpen ? { inert: 'true' } : {})}>
      {children}
    </main>
  );
};

export default Layout;
