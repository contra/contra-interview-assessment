/* eslint-disable canonical/filename-match-exported */
import { type NextPage } from 'next';
import { useState } from 'react';
import Modal from '../components/modal/Modal';
import style from './index.module.css';

const Index: NextPage = () => {
  const [showModal, setShowModal] = useState(false);
  const [showSecondModal, setShowSecondModal] = useState(false);

  return (
    <div>
      <h1>Welcome to Contra!</h1>
      <p>Please start your journey with us by completing our developer quiz.</p>
      <button
        onClick={() => {
          setShowModal(true);
        }}
        role="button"
        tabIndex={0}
        type="button"
      >
        Start
      </button>
      <div style={{width: '100px'}}>
        <p>
          Fine print: Pariatur laboris incididunt amet mollit ullamco fugiat fugiat occaecat commodo excepteur nisi. Voluptate ipsum do ullamco laborum sunt id. Sunt commodo labore aute nisi aliqua enim cillum deserunt est veniam aliqua velit velit. Excepteur irure esse quis sunt. Commodo deserunt culpa aute exercitation nisi incididunt quis incididunt. Ex excepteur exercitation ipsum voluptate labore ea consectetur. Occaecat esse non culpa incididunt anim. In tempor amet sit cillum tempor velit id. Exercitation deserunt pariatur velit culpa Lorem nulla consequat eiusmod minim magna. Id fugiat ex ipsum nulla reprehenderit id tempor do. Fugiat adipisicing dolor culpa magna. Aute duis sunt incididunt sit proident dolore eu aliqua commodo ea pariatur ex. Culpa veniam duis Lorem anim amet nisi nisi occaecat laboris eu dolore do eiusmod. Ullamco cupidatat nulla fugiat duis aute nulla laboris aliquip eiusmod et culpa. Occaecat ipsum pariatur minim laboris officia. Sunt aliqua minim eiusmod duis tempor id occaecat qui dolor ut est ullamco.
        </p>
      </div>

      {showModal && (
        <Modal close={() => setShowModal(false)} title="Developer Quiz">
          <form className={style["quiz-form"]}>
            <label htmlFor="fav_lang">What's your favorite programming language?</label>
            <input id="fav_lang"/>
            <br/>
            <label htmlFor="fav_ide">What's your favorite IDE?</label>
            <input id="fav_ide"/>
            <a href="" onClick={(event)=>{
              event.preventDefault();
              setShowSecondModal(true);
            }}>Why do we care?</a>
            <br/>
            <div className={style["footer"]}>
              <button onClick={()=>setShowModal(false)} role="button"
                      type="button">Done</button>
            </div>

          </form>
        </Modal>
      )}

      {showSecondModal && (
        <Modal close={() => setShowSecondModal(false)} title="Why do we care?">
          <div>
            <iframe
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              height="100%"
              src="https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1"
              title="Embedded youtube"
              width="100%"
            />
            <div className={style["footer"]}>
              <button onClick={()=>setShowSecondModal(false)} role="button"
                      type="button">OK</button>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
};

export default Index;
