import React from 'react'
import { createPortal } from 'react-dom';
import styles from './Modal.module.css'
import { ModalProps } from '@/types';

export default function Modal(props: ModalProps) {
  const { index, setModals, modals } = props;
  const closeModal = () => {
    setModals(modals.slice(0, index).concat(modals.slice(index + 1)));
  }
  const bringToTop = () => {
    const largestZ = modals.reduce((pre, cur) => {
      return Math.max(pre, (cur?.styles?.zIndex || 10));
    }, 0);
    const updatedModals = [...modals];
    updatedModals[index] = {
      ...modals[index],
      styles: {
        ...modals[index]?.styles,
        zIndex: largestZ + 1,
      }
    }
    setModals(updatedModals);
  }
  const dragStart = (e: React.PointerEvent) => {
    const largestZ = modals.reduce((pre, cur) => {
      return Math.max(pre, (cur?.styles?.zIndex || 10));
    }, 0);
    const updatedModals = [...modals];
    updatedModals[index] = {
      ...modals[index],
      diffX: e.screenX - e.currentTarget.getBoundingClientRect().left,
      diffY: e.screenY - e.currentTarget.getBoundingClientRect().top,
      dragging: true,
      styles: {
        ...modals[index]?.styles,
        zIndex: largestZ + 1,
      }
    }
    setModals(updatedModals);
  }
  const dragging = (e: React.PointerEvent) => {
    if (modals[index]?.dragging){
      let left = e.screenX - (modals[index]?.diffX || 0);
      let top = e.screenY - (modals[index]?.diffY || 0);
      const updatedModals = [...modals];
      updatedModals[index] = {
        ...modals[index],
        styles: {
          ...modals[index]?.styles,
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
  const clickTab = (e: React.PointerEvent) => {
    const targetTab = (e.target as HTMLInputElement).dataset['name'];
    const updatedModals = [...modals];
    updatedModals[index] = {
      ...modals[index],
      active: targetTab,
    }
    setModals(updatedModals);
  }
  return createPortal(
    <div className={styles['modal']} style={modals[index]?.styles}>
      <div className={styles['modalHeader']} onPointerDown={dragStart} onPointerMove={dragging} onPointerUp={dragEnd}>
        <div className={styles['tabs']}>
          <button onClick={clickTab} className={modals[index]?.active === 'A' ? styles['activeTab'] : styles['inactiveTab']} data-name='A'>Tab A</button>
          <button onClick={clickTab} className={modals[index]?.active === 'B' ? styles['activeTab'] : styles['inactiveTab']} data-name='B'>Tab B</button>
        </div>
        <button className={styles['closeBtn']} onClick={closeModal}>X</button>
      </div>
      <div onPointerDown={bringToTop} className={styles['content']}>
        <p>Move the modal by dragging the header.</p>
        <p>Click on the tabs to view different values.</p>
        <br/>
        <p>{modals[index]?.active === 'A' ? `Value 🅰️: ${modals[index]?.valueA}` : `Value 🅱️: ${modals[index]?.valueB}`}</p>
      </div>
    </div>,
    document.getElementById('portal')
  )
}



