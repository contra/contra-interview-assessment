import React from 'react';
import { AiOutlineCloseCircle } from 'react-icons/ai';
import styles from './CloseModalButton.module.css';

type IProps = {
  handleClose: (argument?: JSX.Element) => void;
};

export const CloseModalButton: React.FC<IProps> = ({ handleClose }) => {
  return (
    <button
      className={styles['CloseButton']}
      onClick={() => handleClose()}
      tabIndex={-1}
      type="button"
    >
      <AiOutlineCloseCircle />
    </button>
  );
};

export default CloseModalButton;
