import { useState } from 'react';
import { Button } from '@/packages/button/Button';
import styles from './ModalDemo.module.css';

export const ModalDemo = () => {
  const [isFirstModalOpen, setIsFirstModalOpen] = useState(false);
  const [isSecondModalOpen, setIsSecondModalOpen] = useState(false);

  return (
    <main className={styles['modalDemo']}>
      <h1>Contra Modal Demo</h1>

      <Button onClick={() => setIsFirstModalOpen(true)}>Open modal</Button>

      <Button
        onClick={() => setTimeout(() => setIsSecondModalOpen(true), 2_000)}
      >
        Open modal async
      </Button>

      {isFirstModalOpen && <dialog open>First modal</dialog>}
      {isSecondModalOpen && <dialog open>Async modal</dialog>}
    </main>
  );
};
