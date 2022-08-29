import React from 'react';
import CloseButton from '../CloseModalButton';
import { Heading } from '../Heading';
import styles from './ModalContent.module.css';

type IProps = {
  ariaLabelID?: string;
  handleModal: (content?: JSX.Element) => void;
  heading?: string;
  modalContent?: JSX.Element;
};

export const ModalContent: React.FC<IProps> = ({
  ariaLabelID,
  handleModal,
  heading,
  modalContent,
}) => {
  return (
    <div className={styles['ModalContent']}>
      <CloseButton handleClose={handleModal} />
      <div className={styles['ModalContent-inner']}>
        {heading && <Heading ariaLabelID={ariaLabelID}>{heading}</Heading>}
        {modalContent}
      </div>
    </div>
  );
};

export default ModalContent;
