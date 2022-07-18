import React, { useEffect, useState, useRef, CSSProperties, ReactNode } from 'react';
import { createPortal } from 'react-dom';
import Button from './Button';
import { closeButton } from '@/styles/common';

// Props
interface Props {
    handleClose: () => void,
    title: string,
    children?: ReactNode
}

// Styles
const contraOverlay: CSSProperties = {
    position: 'fixed',
    zIndex: 1000,
    inset: '0px',
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
    overflow: 'hidden auto',
    padding: '16px'
}

const contraModalContainer: CSSProperties = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    minHeight: '100%'
}

const contraModal: CSSProperties = {
    fontFamily: 'sans-serif',
    position: 'relative',
    zIndex: 1001,
    margin: 'auto 0px',
    backgroundColor: 'white',
    boxShadow: 'rgb(0 0 0 / 4%) 0px 0px 40px',
    borderRadius: '20px',
    maxWidth: '640px',
    width: '100%',
    padding: '32px'
}

export const contraModalCloseButton: CSSProperties = {
    appearance: 'none',
    cursor: 'pointer',
    border: 0,
    background: 'transparent',
    height: '25px'
}

const header: CSSProperties = {
    display: 'flex'
}

const headerText: CSSProperties = {
    flex: 1,
    margin: '0 0 40px'
}

const contraModalFooter: CSSProperties = {
    marginTop: '24px',
    textAlign: 'right'
}

const Modal = ({ handleClose, title, children }: Props) => {
    const modalRef = useRef<HTMLDivElement>(null);

    // Init
    const [mounted, setMounted] = useState<boolean>(false);
    useEffect(() => {
        document.body.style.overflow === 'hidden';

        // Deal with SSR
        setMounted(true);

        // Accessibility keys
        const keyListener = (e: KeyboardEvent) => {
            // get the listener corresponding to the pressed key
            const listener = keyListenersMap.get(e.key);
          
            // call the listener if it exists
            return listener && listener(e);
        }
        document.addEventListener('keydown', keyListener);

        // Remove listeners and scroll locks
        return () => {
            setMounted(false);
            document.removeEventListener('keydown', keyListener);
            const alreadyHidden = document.body.style.overflow === 'hidden';
            const lastModal = document.getElementsByClassName('modal_overlay').length === 0;
            document.body.style.overflow = (alreadyHidden && lastModal ? 'unset' : 'hidden');
        }
    }, []);

    // Escape key to close current modal (not all)
    const handleEscapeKey = (event: KeyboardEvent) => {
        if (event.code === 'Escape' && modalRef.current?.contains(document.activeElement)) handleClose();
    }

    // Focus trap
    const handleTabKey = (e: KeyboardEvent) => {
        const focusableModalElements = modalRef.current?.querySelectorAll(
            'a[href], button, textarea, input[type="text"], input[type="radio"], input[type="checkbox"], select'
        );

        const firstElement: HTMLElement = focusableModalElements?.[0];
        const lastElement: HTMLElement = focusableModalElements?.[focusableModalElements.length - 1];

        if (!e.shiftKey && document.activeElement === lastElement) {
            firstElement?.focus();
            return e.preventDefault();
        }

        if (e.shiftKey && document.activeElement === firstElement) {
            lastElement?.focus();
            e.preventDefault();
        }
    };

    // Key map
    const keyListenersMap = new Map([
        ['Escape', handleEscapeKey],
        ['Tab', handleTabKey],
    ]);

    return mounted ? createPortal(
        <div
            className="modal_overlay"
            style={contraOverlay}
            ref={modalRef}>
            <div style={contraModalContainer}>
                <div style={contraModal}>
                    <div style={header}>
                        <h1 style={headerText}>{title}</h1>
                        <button
                            style={contraModalCloseButton}
                            autoFocus
                            onClick={handleClose}>
                            <svg
                                width="24"
                                height="24"
                                viewBox="0 0 24 24"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                                focusable="false"
                                role="img">
                                <path
                                    d="M20.53 4.53L13.06 12l7.47 7.47-1.06 1.06L12 13.06l-7.47 7.47-1.06-1.06L10.94 12 3.47 4.53l1.06-1.06L12 10.94l7.47-7.47 1.06 1.06z"
                                    fill="currentColor" />
                            </svg>
                        </button>
                    </div>
                    <div>
                        {children}
                    </div>
                    <div style={contraModalFooter}>
                        <Button
                            onClick={handleClose}>
                            Cancel
                        </Button>
                    </div>
                </div>
            </div>
        </div>
        , document.getElementById('modals')) :
        null;
};

export default Modal;