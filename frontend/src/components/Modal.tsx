import React from 'react'
import { createPortal } from 'react-dom';
import styles from './Modal.module.css'

export default function Modal({ index, setModals, modals }) {
  const closeModal = () => {
    setModals(modals.slice(0, index).concat(modals.slice(index + 1)));
  }
  const dragStart = (e) => {
    const largestZ = modals.reduce((pre, cur) => {
      return Math.max(pre, cur.styles.zIndex);
    }, 0);
    const updatedModals = [...modals];
    updatedModals[index] = {
      ...modals[index],
      diffX: e.screenX - e.currentTarget.getBoundingClientRect().left,
      diffY: e.screenY - e.currentTarget.getBoundingClientRect().top,
      dragging: true,
      styles: {
        ...modals[index].styles,
        zIndex: largestZ + 1,
      }
    }
    setModals(updatedModals);
  }
  const dragging = (e) => {
    if (modals[index].dragging){
      let left = e.screenX - modals[index].diffX;
      let top = e.screenY - modals[index].diffY;
      const updatedModals = [...modals];
      updatedModals[index] = {
        ...modals[index],
        styles: {
          ...modals[index].styles,
          left: left,
          top: top,
        }
      }
      setModals(updatedModals)
    }
  }
  const dragEnd = () => {
    const updatedModals = [...modals];
    updatedModals[index] = {
      ...modals[index],
      dragging: false,
    }
    setModals(updatedModals)
  }
  const clickTab = (e) => {
    const targetTab = e.target.dataset.name;
    const updatedModals = [...modals];
    updatedModals[index] = {
      ...modals[index],
      active: targetTab,
    }
    setModals(updatedModals);
  }
  return createPortal(
    <div className={styles.modal}  style={modals[index].styles}>
      <div className={styles.modalHeader} onMouseDown={dragStart} onMouseMove={dragging} onMouseUp={dragEnd}>
        <div className={styles.tabs}>
          <button onClick={clickTab} className={modals[index].active === 'A' ? styles.activeTab : styles.inactiveTab} data-name='A'>Tab A</button>
          <button onClick={clickTab} className={modals[index].active === 'B' ? styles.activeTab : styles.inactiveTab} data-name='B'>Tab B</button>
        </div>
        <button className={styles.closeBtn} onClick={closeModal}>X</button>
      </div>
      <div className={styles.content}>
        <p>{modals[index].active === 'A' ? `Value A: ${modals[index].valueA}` : `Value B: ${modals[index].valueB}`}</p>
      </div>
    </div>,
    document.getElementById('portal')
  )
}



