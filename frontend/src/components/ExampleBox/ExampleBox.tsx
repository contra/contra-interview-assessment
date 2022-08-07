import { type FC } from 'react';
import {
  wrapperStyle,
  innerStyle,
  infoWrapperStyle,
  infoTitleStyle,
  infoDescriptionStyle,
} from './example-box.css';

type ExampleBoxProps = {
  children?: React.ReactNode;
  description: string;
  title: string;
};

const ExampleBox: FC<ExampleBoxProps> = ({ description, title, children }) => {
  return (
    <div className={wrapperStyle}>
      <div className={innerStyle}>{children}</div>
      <div className={infoWrapperStyle}>
        <h3 className={infoTitleStyle}>{title}</h3>
        <p className={infoDescriptionStyle}>{description}</p>
      </div>
    </div>
  );
};

export default ExampleBox;
