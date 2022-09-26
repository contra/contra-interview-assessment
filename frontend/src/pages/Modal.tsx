import React, { MouseEventHandler, useRef, } from 'react';

interface Props {
    children: React.ReactNode;
    open: Boolean;
    closeModal: MouseEventHandler;
}

const OverlayStyles = {
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: "rgba(0,0,0,.9)",
    zIndex: 100,
} as React.CSSProperties;

const ModalStyles = {
    position: "fixed",
    top: '50%',
    left: '50%',
    background: "rgba(0,0,0,1)",
    transform: "translate(-50%, -50%)",
    padding: '4rem',
    zIndex: 100,
    color: 'white',
    fontSize: '2rem',
    border: '1px solid white',
    maxWidth: '80%',
} as React.CSSProperties;

const CloseBtnStyles = {
    position: "absolute",
    top: '7%',
    right: '5%',
    padding: '0.5rem',
    border: '.5px solid white',
    borderRadius: '3px',
    background: 'none',
    fontSize: '.8rem',
    transition: "all .4s ease",
    color: '#ddd'
} as React.CSSProperties;

const Modal = ({ children, open, closeModal }: Props) => {

    const btn = useRef<HTMLButtonElement>(null);

    if(!open) return null;

    return (
        <>
            <div style={ OverlayStyles } onClick={ closeModal } />
            <div style={ ModalStyles }>
                <div>
                    <button ref={ btn } style={ CloseBtnStyles } onClick={ closeModal }>Close</button>
                    { children }
                </div>
            </div>
        </>
    );
};

export default Modal;