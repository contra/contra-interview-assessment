import Modal from '../Modal';
import styles from './SimpleModal.module.css';
import useModal from '../../hooks/useModal';

export declare interface SimpleModalProps {
  onExit: (event: KeyboardEvent | React.MouseEvent<HTMLButtonElement>) => void;
}

const SimpleModal = ({ onExit }: SimpleModalProps) => {
  const { showSimpleModal } = useModal();

  function onClickHandler(event: React.MouseEvent<HTMLButtonElement>) {
    onExit(event);
  }

  const footer = (
    <>
      <button onClick={onClickHandler} className={styles['cancelBtn']}>
        Cancel
      </button>
      <button className={styles['continue']}>Continue</button>
    </>
  );

  return (
    <Modal onExit={onExit} footer={footer}>
      <div className={styles['title']}>
        <h1>Are You Sure You Want to Continue?</h1>
      </div>
      <button onClick={showSimpleModal}>Show Modal</button>
      <div className={styles['body']}>
        <p>The next page looks amazing. Hope you want to go there!</p>
      </div>
    </Modal>
  );
};

export default SimpleModal;
