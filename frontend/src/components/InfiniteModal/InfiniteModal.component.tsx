import { useState } from 'react';
import Modal from '../Modal/Modal.component';

export default function InfiniteModel({ count = 0, styles = {} }: { count?: number, styles?: { [key: string]: string } }) {
  const [open1, setOpen1] = useState(false);

  return (
    <div className={styles.modalBody}>
      <h1>You can open modals forever</h1>
      <h1>modal {count}</h1>
      <button type="button" className={styles.button} onClick={() => setOpen1(true)}>open modal {count + 1}!</button>
      <Modal
        isOpen={open1}
        onClose={() => {
          setOpen1(false);
        }}
      >
        <InfiniteModel styles={styles} count={count+1} />
      </Modal>
    </div>
  );
}
