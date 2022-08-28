import { useCallback, useState } from 'react';
import { Button } from '@/packages/button';
import { Modal } from '@/packages/modal';
import styles from './ModalDemo.module.css';

export const ModalDemo = () => {
  const [isFirstModalOpen, setIsFirstModalOpen] = useState(false);
  const [isSecondModalOpen, setIsSecondModalOpen] = useState(false);
  const closeFirstModal = useCallback(() => setIsFirstModalOpen(false), []);
  const closeSecondModal = useCallback(() => setIsSecondModalOpen(false), []);

  return (
    <main className={styles['modalDemo']}>
      <h1 className={styles['header']}>Contra Modal Demo</h1>

      <Button onClick={() => setIsFirstModalOpen(true)}>Open modal</Button>

      <Button
        onClick={() => setTimeout(() => setIsSecondModalOpen(true), 2_000)}
      >
        Open modal async
      </Button>

      {isFirstModalOpen && (
        <Modal onBackdropClick={closeFirstModal}>
          <h2>First modal</h2>
          <Modal.XButton onClick={closeFirstModal} />
          <Modal.Footer>
            <Button onClick={() => {}}>Wow</Button>
            <Button onClick={() => {}}>Incredible</Button>
          </Modal.Footer>
        </Modal>
      )}
      {isSecondModalOpen && (
        <Modal onBackdropClick={closeSecondModal}>
          <h2>Hello there from async modal</h2>
          <Modal.Footer>
            <Button onClick={closeSecondModal}>Cool</Button>
          </Modal.Footer>
        </Modal>
      )}
    </main>
  );
};
