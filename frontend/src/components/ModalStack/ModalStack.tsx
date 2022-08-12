import { useState } from 'react';
import Modal from '../Modal/Modal';
import styles from '../Modal/Modal.module.css';

export default function ModalStack({ count = 0 }: { count?: number }) {
    const [visible, setVisible] = useState(false);
    const defaultprops = {
        footer: <div />,
        handleClose: () => setVisible(false),
        isOpen: visible,
        title: 'Modal Stacked',
    };

    return (
        <>
            <div>
                <h1>Modal {count}</h1>
                <button className={styles['button']} onClick={() => setVisible(true)}>
                    Add Next Modal
                </button>
            </div>
            {visible ? (
                <Modal {...defaultprops}>
                    <ModalStack count={count + 1} />
                </Modal>
            ) : null}
        </>
    );
}
