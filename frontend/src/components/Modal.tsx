/* eslint-disable unicorn/numeric-separators-style */
/* eslint-disable jsx-a11y/no-noninteractive-tabindex */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
import classNames from 'classnames';
import FocusTrap from 'focus-trap-react';
import React, { useContext, useEffect, useRef } from 'react';
import Button from './Button';

/**
 * TODO:
 * 1) create Modal component and display this on the index page ✅
 * 2) add toggle button on index page to display the modal ✅
 * 3) add prop to show Modal ✅
 * 4) add a way to close Modal ✅
 * 5)
 * 6) add overlay ✅
 * 7) prevent scrolling ✅
 * 8) Handle stacking ✅
 * 8.1) Fix ESC handling on nested dialogs ✅
 * 8.2) Fix scroll disabling on nested dialogs ✅
 * 9) handle focus management and tabbing ✅
 * 10) Allow escape to close the modal ✅
 * 11.1) Fix mobile vertical alignment for modal ✅
 * bonus 1) add modal animation ✅
 * bonus 2) add button animation ✅
 */


type Props = {
    animate?: boolean,
    children: React.ReactNode,
    handleClose: CloseHandler,
    show: boolean,
    title: string,
}

type CloseHandler = () => void;

/**
 * Create overlay component that darkens the background and handles clicks
 */
const Overlay = ({ handleClose, zIndex }: { handleClose: CloseHandler, zIndex: number }) => {

    return <div 
        aria-hidden="true"
        className="absolute top-0 left-0 w-full h-full bg-slate-300/80"
        onClick={handleClose}
        role="button" 
        style={{zIndex}}
        tabIndex={0}
    />;
}

/**
 * We are using a React context to keep track of the nesting level of modals.
 * Then we can use this information to only disable/enable scrolling once for the topmost Modal.
 */
const NestingLevel = React.createContext(0);

const Modal = ({ animate = true, children, handleClose, show, title }: Props) => {

    const nestingLevel = useContext(NestingLevel);
    
    const handleKey = (event: React.KeyboardEvent) => {
        if (event.key === 'Escape' || event.key === 'Esc' || event.keyCode === 27) {
            // without this parent modals will also close
            event.stopPropagation();
            handleClose();
        }
    }

    /**
     * Prevent background from scrolling while the Modal is open
     */
    // eslint-disable-next-line consistent-return
    useEffect(() => {
        if (nestingLevel === 0) {
            if (show) {
                document.body.style.overflow = 'hidden';
            }
            else {
                document.body.style.overflow = 'unset';
            }

            return () => { 
                document.body.style.overflow = 'unset';
            };
        }
    }, [show, nestingLevel]);

    /**
     * Trigger animation to drop the dialog from the top
     */
    const dialogRef = useRef<HTMLDivElement>(null);
    useEffect(() => {
        if (dialogRef.current) {
            dialogRef.current.classList.remove('mt-[-1000px]');
            dialogRef.current.classList.add('mt-0');
        }
    });

    const focusTrapOptions = {
        clickOutsideDeactivates: true,
        // we need escapeDeactivates to be false otherwise nested dialogs will close in the wrong order
        escapeDeactivates: false,
        // we need fallbackFocus for tests to pass
        fallbackFocus: `div[aria-label=${title}]`, 
    }

    const modalStyle = "absolute w-full sm:w-[400px] sm:-ml-[200px] bg-white sm:rounded-xl shadow-xl top-1/4 sm:left-1/2"
    const animation = animate ? "transition-all duration-300 ease-out mt-[-1000px]": "mt-0";

    return show ? (<div className="fixed top-0 left-0 w-full h-full">
        <Overlay handleClose={handleClose} zIndex={1000+nestingLevel*2}/>
        <FocusTrap focusTrapOptions={focusTrapOptions}>
            <div aria-label={title}
                className={classNames(modalStyle, animation)}
                onKeyUp={handleKey} ref={dialogRef} role="dialog"
                style={{zIndex: 1001+nestingLevel*2}} tabIndex={-1}
            >
                <h2 className="text-center bg-violet-700 sm:rounded-t-xl text-white py-1">{title}</h2>
                
                <div className="py-8 px-8 space-y-2 sm:py-4 flex items-center flex-col sm:space-y-0 sm:space-x-6">
                <NestingLevel.Provider value={nestingLevel+1}>
                    {children}
                </NestingLevel.Provider>
                </div>
                <div className="text-center mb-4">
                    <Button onClick={handleClose}>Close</Button>
                </div>
            </div>
        </FocusTrap>
    </div>) : null;
}

export default Modal;