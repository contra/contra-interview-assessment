import React from 'react'
import { createPortal } from 'react-dom';
import styles from './Modal.module.css'

export default function Modal({children, index, setModals, modals}) {
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
  return createPortal(
    <div className={styles.modal} onMouseDown={dragStart} onMouseMove={dragging} onMouseUp={dragEnd} style={modals[index].styles}>
      <div className={styles.modalHeader}>Drag Modal to Move</div>
      <p>{children}</p>
      <button onClick={closeModal}>Close</button>
    </div>,
    document.getElementById('portal')
  )
}



