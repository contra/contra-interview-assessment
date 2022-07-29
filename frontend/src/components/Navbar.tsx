import React from 'react'
import { createPortal } from 'react-dom';
import styles from './Navbar.module.css'
import { NavbarProps } from '@/types';

export default function Navbar(props: NavbarProps) {
  const {openModal} = props;
  if (typeof window !== 'undefined'){
    return createPortal(
      <nav className={styles['navbar']}>
        <h1>Welcome to Contra!</h1>
        <button className={styles['modalBtn']} onClick={openModal}>Open Modal</button>
      </nav>,
      document.getElementById('portal')
    )
  }
  return (
    <nav className={styles['navbar']}>
      <h1>Welcome to Contra!</h1>
      <button className={styles['modalBtn']} onClick={openModal}>Open Modal</button>
    </nav>
  )
}
