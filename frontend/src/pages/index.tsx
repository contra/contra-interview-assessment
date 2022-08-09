/* eslint-disable canonical/filename-match-exported */
import { type NextPage } from 'next';
import Modal from "../components/Modal/Modal";
import styles from './index.module.css';
import useModal from "../hooks/useModal";

const Index: NextPage = () => {
  const { modalOpen, close, open } = useModal();
  return (
    <div className={styles['app']}>
        <button onClick={open}>
          Click to Open Modal
        </button>

        {modalOpen && <Modal handleClose={close} isOpen={modalOpen} title="Sample Modal"/>}
    </div>
  );
};

export default Index;