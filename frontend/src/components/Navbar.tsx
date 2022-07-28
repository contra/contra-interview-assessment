import React from 'react'
import { createPortal } from 'react-dom';
import styles from './Navbar.module.css'

export default function Navbar({openModal}) {
  if (typeof window !== 'undefined'){
    return createPortal(
      <nav className={styles.navbar}>
        <h1>Welcome</h1>
        <button className={styles.modalBtn} onClick={openModal}>Create new modal</button>
      </nav>,
      document.getElementById('portal')
    )
  }
  return (
    <nav className={styles.navbar}>
      <h1>Welcome</h1>
      <button className={styles.modalBtn} onClick={openModal}>Create new modal</button>
    </nav>
  )
}
