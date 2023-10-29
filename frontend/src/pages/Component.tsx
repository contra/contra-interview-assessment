import React, { useEffect, useRef, useState } from 'react';

import Portal from './util/Portal';
import Modal from './Modal';
import CanvasComponent from './CanvasComponent';
import gsap from 'gsap';

const OpenBtnStyles = {
    background: "none",
    color: "white",
    padding: ".8rem",
    fontSize: "1rem",
    fontWeight: "bold",
    border: '1.7px solid #aaa',
    borderRadius: "9px",
    fontFamily: '"Lucida Console", "Courier New", monospace',
    top: '50%',
    left: '50%',
    position: "relative",
    transform: "translate(-50%, -50%)",
    maxWidth: '80%',
    textShadow: '1px 1px 2px #000, 1px 1px 5px #ccc',

} as React.CSSProperties;

const ContainerStyles = {
    position: "relative",
    width: "100%",
    height: "100vh",
    margin: 0,
    padding: 0
} as React.CSSProperties;


const Component = () => {

    const [modalOpen, setModalOpen] = useState<boolean>(false);
    const [hovered, setHovered] = useState(false);
    const btn = useRef(null);

    useEffect(() => {
        const body = document.querySelector('body');
        if(body !== null) {
            body.style.overflow = modalOpen ? 'hidden' : 'auto';
        }
    }, [modalOpen]);

    const handleHover = () => {
        if(btn.current === null) return;
        if(!hovered) {
            gsap.to(btn.current["style"], {
                color: 'black',
                background: 'white',
                textShadow: 'none',
                duration: 1.5,
            });
        } else {
            gsap.to(btn.current["style"], {
                color: 'white',
                background: 'black',
                duration: 1,
            });
        }
        setHovered(!hovered);
    };

    return (
        <>
            <CanvasComponent />
            <div style={ ContainerStyles }>
                <button
                    ref={ btn }
                    onMouseEnter={ handleHover }
                    onMouseLeave={ handleHover }
                    style={ OpenBtnStyles }
                    type="button"
                    onClick={ () => setModalOpen(true) }
                >click me</button>
                <Portal selector='#portal'>
                    <Modal open={ modalOpen } closeModal={ () => setModalOpen(false) }><h2 style={ { textAlign: 'center' } } >Hello Contra Team!!</h2></Modal>
                </Portal>
            </div>

        </ >

    );
};

export default Component;