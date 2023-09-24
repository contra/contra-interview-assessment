import * as React from 'react';
import Modal from './Modal';
import styles from './ItemsListModal.module.css';

const ITEMS = [
  {
    name: 'Item 1',
    desc: 'This is the item 1',
  },
  {
    name: 'Item 2',
    desc: 'This is the item 2',
  },
] as const;

type Item = typeof ITEMS[number];

export type ItemsListModal = {
  handleClose: () => void;
};
export default function ItemsListModal({ handleClose }: ItemsListModal) {
  const [currentItem, setcurrentItem] = React.useState<Item | undefined>(
    undefined
  );

  const onItemClick = (item: Item, e: React.MouseEvent) => {
    e.preventDefault();
    setcurrentItem(item);
  };

  const onCloseItem = () => {
    setcurrentItem(undefined);
  };

  return (
    <>
      <div className={styles['items-list']}>
        <ul>
          {ITEMS.map((item, index) => (
            <li key={index}>
              <a href="#" onClick={(e) => onItemClick(item, e)}>
                {item.name}
              </a>
            </li>
          ))}
        </ul>
        <button onClick={handleClose}>Close</button>
      </div>
      {currentItem && (
        <Modal handleClose={onCloseItem}>
          <div className={styles['item-details']}>
            <h1>{currentItem.name}</h1>
            <p>{currentItem.desc}</p>
            <button onClick={onCloseItem}>Close</button>
          </div>
        </Modal>
      )}
    </>
  );
}
