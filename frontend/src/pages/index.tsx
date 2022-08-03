/* eslint-disable canonical/filename-match-exported */
import { NextPage } from 'next';
import { Fragment, useState, useRef } from 'react';
import Modal from '../components/Modal/Modal.component';
import InfiniteModel from '../components/InfiniteModal/InfiniteModal.component'
import ThemeToggle from '../components/ThemeToggle/ThemeToggle.component';
import styles from './index.module.css';

const Index: NextPage = () => {
  const [open1, setOpen1] = useState(false);
  const [open2, setOpen2] = useState(false);
  const [open3, setOpen3] = useState(false);
  const [open4, setOpen4] = useState(false);
  const [open5, setOpen5] = useState(false);
  const [open6, setOpen6] = useState(false);
  const [open7, setOpen7] = useState(false);
  const focusRef = useRef<HTMLInputElement>(null);
  return (
    <Fragment>
      <div style={{ float: 'right' }}>
        <ThemeToggle />
      </div>
      <h1>Welcome to Contra!</h1>
      

      <div className={styles.buttonWrapper}>
        <button type="button" className={styles.button} onClick={() => setOpen1(true)}>Basic  modal</button>
        <button type="button" className={styles.button} onClick={() => setOpen2(true)}>Click overlay to close</button>
        <button type="button" className={styles.button} onClick={() => setOpen3(true)}>Modal with tall contents</button>
        <button type="button" className={styles.button} onClick={() => setOpen4(true)}>Launch a modal from a modal</button>
        <button type="button" className={styles.button} onClick={() => setOpen6(true)}>Infinite Modals</button>
        <button type="button" className={styles.button} onClick={() => setOpen7(true)}>Focus on open</button>
      </div>
      <div style={{ height: '10000px', width: '10px' }}></div>

      Hello! I'm just down here making the page very tall! When you open a modal notice that the screen will lock in place and not let you scroll -- <button type="button" className={styles.button} onClick={() => setOpen1(true)}>scroll demo</button>
      <br />
      <br />
      <br />

      <Modal isOpen={open1}>
        <div className={styles.modalBody}>
          <h1>Just a bare bones modal</h1>
          <p>This is as basic as it gets.</p>
          <button type="button" onClick={() => setOpen1(false)}>click me to close</button>
        </div>
      </Modal>

      <Modal
        isOpen={open2}
        onClose={() => setOpen2(false)}
      >
        <div className={styles.modalBody}>
          <h1>Click my overlay outside this modal to close me</h1>
          <p>Great for optional modals</p>
        </div>
      </Modal>
      
      <Modal
        isOpen={open3}
        onClose={() => setOpen3(false)}
      >
        <div className={styles.modalBody}>
          <h1>I am very tall</h1>
          <p>when I get too tall I overflow and let the user scroll.</p>
          <div className={styles.sillyBackground} style={{ height: '10000px', width: '50%', margin: '0 auto' }}></div>
          <p>Thanks for scrolling!</p>
          <br />
        </div>
      </Modal>

      <Modal isOpen={open4}>
        <div className={styles.modalBody}>
          <h1>Suprise! You can't close me</h1>
          <p>you'll need to proceed to the next step</p>
          <button type="button" onClick={() => setOpen5(true)}>next step</button>
        </div>
      </Modal>

      <Modal
        isOpen={open5}
        onClose={() => {
          setOpen4(false);
          setOpen5(false);
        }}
      >
        <div className={styles.modalBody}>
          <h1>You made it</h1>
          <p>click the overlay to close</p>
          <button
            type="button"
            onClick={() => {
              setOpen4(false);
              setOpen5(false);
            }}
          >or click here</button>
        </div>
      </Modal>

      <Modal
        focusRef={focusRef}
        isOpen={open7}
        onClose={() => {
          setOpen7(false);
        }}
      >
        <div className={styles.modalBody}>
          <h1>Weclome. When I opened I auto focused on the input below</h1>
          <input type="text" ref={focusRef} />
          <br />
          <input type="password" />
          <br />
          <button
            type="button"
            onClick={() => {
              setOpen7(false);
            }}
          >click here to close</button>
        </div>
      </Modal>

      <Modal
        isOpen={open6}
        onClose={() => {
          setOpen6(false);
        }}
      >
        <InfiniteModel styles={styles} />
      </Modal>
    </Fragment>
  );
};

export default Index;
