/* eslint-disable canonical/filename-match-exported */
import styles from './modal.module.css';
import ReactDOM from 'react-dom';
import React, { FunctionComponent, ReactFragment, useEffect } from 'react';
import FocusLock from 'react-focus-lock';

export interface ModalProps {
    isShowing: boolean;
    closeModal: () => void;
    content: ReactFragment;
    headline: string;
}

const Modal: FunctionComponent<ModalProps> = ({ isShowing, closeModal, content, headline }) => {
    const onKeyDown = (event: KeyboardEvent) => {
        if (event.keyCode === 27 && isShowing) {
            closeModal();
        }
    };

    useEffect(() => {
        document.addEventListener('keydown', onKeyDown, false);
        return () => {
            document.removeEventListener('keydown', onKeyDown, false);
        };
    }, [isShowing]);

    useEffect(() => {
        isShowing ? (document.body.style.overflow = 'hidden') : (document.body.style.overflow = 'unset');
        document.addEventListener('keydown', onKeyDown, false);
        return () => {
            document.removeEventListener('keydown', onKeyDown, false);
        };
    }, [isShowing]);

    const modal = (
        <React.Fragment>
            <div className={styles['modal-container']}>
            </div>
            <FocusLock>
                <div
                    className={styles['modal-wrapper']}
                    aria-modal
                    aria-labelledby={headline}
                    tabIndex={-1}
                    role="dialog">
                    <div className={styles['modal']}>
                        <div className={styles['modal-header']}>
                            <h1>
                                {headline}
                            </h1>
                            <button
                                className={styles['modal-close-button']}
                                onClick={closeModal}
                                type="button"
                                data-dismiss="modal"
                                aria-label="Close">
                                X
                            </button>
                        </div>
                        <div className={styles['modal-body']}>{content}</div>
                        <div className={styles['modal-footer']}>
                            <button className={styles['modal-button']} onClick={closeModal}> Confirm </button>
                            <button className={styles['modal-button']} onClick={closeModal}> Cancel </button>
                        </div>
                    </div>
                </div>
            </FocusLock>
        </React.Fragment>
    );

    return isShowing ? ReactDOM.createPortal(modal, document.body) : null;
}

export default Modal;