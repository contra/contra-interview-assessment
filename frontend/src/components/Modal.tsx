import React from 'react'
import { createPortal } from 'react-dom';
import styles from './Modal.module.css'

export default function Modal({children, index, setModals, modals}) {
  const closeModal = () => {
    setModals(modals.slice(0, index).concat(modals.slice(index + 1)));
  }
  const dragStart = (e) => {
    modals[index].dragging = true;
    console.log(e.clientX, e.clientY)
  }
  const dragging = (e) => {
    console.log('holding down the mouse button!')
  }
  const dragEnd = (e) => {
    modals[index].dragging = false;
  }
  return createPortal(
    <div className={styles.modal}>
      <div className={styles.modalHeader} onMouseDown={dragStart} onMouseMove={dragging} onMouseUp={dragEnd}>Click here to move</div>
      <p>{children}</p>
      <button onClick={closeModal}>Close</button>
    </div>,
    document.getElementById('portal')
  )
}



