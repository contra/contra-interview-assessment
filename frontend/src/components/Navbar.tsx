import React from 'react'
import { createPortal } from 'react-dom';
import styles from './Navbar.module.css'
import { NavbarProps } from '@/types';

export default function Navbar(props: NavbarProps) {
  const {openModal, closeModals} = props;
  const [domReady, setDomReady] = React.useState(false);
  React.useEffect(() => {
    setDomReady(true)
  })
  const navbar = (
    <nav className={styles['navbar']}>
      <h1 className={styles['title']}>Welcome to Contra!</h1>
      <div className={styles['buttons']}>
        <button className={styles['modalBtn']} onClick={openModal}>Open Modal</button>
        <button className={styles['modalBtn']} onClick={closeModals}>Close All Modals</button>
      </div>
    </nav>
  )
  // if (typeof window !== 'undefined') return createPortal(navbar, document.getElementById('portal'))
  // else return (navbar)
  if (domReady) return createPortal(navbar, document.getElementById('portal'))
  else return null;
}
