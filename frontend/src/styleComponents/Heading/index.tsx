import { EMediaBreakPoint, useMediaQuery } from '@/utils/useMediaQuery';
import { ESystemColor } from '../../styles/ESystemColor';
import styles from './Heading.module.css';

type TProps = {
  ariaLabelID?: string;
  children: string;
  color?: ESystemColor;
  size?: 'large' | 'regular' | 'small';
};
export const Heading: React.FC<TProps> = ({
  ariaLabelID,
  color = ESystemColor.blue,
  children,
  size = 'regular',
}) => {
  const fontSize =
    size === 'small' ? '2rem' : size === 'large' ? '4rem' : '3rem';

  const isMobile = useMediaQuery(EMediaBreakPoint.mobile);

  return (
    <h1
      className={styles['Heading']}
      id={ariaLabelID}
      style={{ color, fontSize: isMobile ? '2rem' : fontSize }}
    >
      {children}
    </h1>
  );
};
