import { Dispatch, ForwardedRef, KeyboardEvent, MouseEvent, ReactNode, SetStateAction, forwardRef, useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import { disableBodyScroll, enableBodyScroll, clearAllBodyScrollLocks } from 'body-scroll-lock'
import TrapFocus from 'focus-trap-react'

const ESCAPE_KEY = 'Escape'

type ModalProps = {
    isOpen: boolean,
    title: ReactNode,
    fullscreen?: boolean,
    dismissOnOutsideClick?: boolean,
    children: ReactNode,
    onClose: () => void,
}

type ActualModalProps = {
    title: ReactNode,
    fullscreen?: boolean,
    children: ReactNode,
    onClose: () => void,
    onOverlayClick: (event: MouseEvent<HTMLDivElement>) => void
    onHover: Dispatch<SetStateAction<boolean>>
}

type HeaderProps = {
    children: ReactNode,
    closeHandler: () => void,
}

const Header = ({ children, closeHandler }: HeaderProps) => {
    return (
        <div 
            className='horizontal-flex modal__title'
            data-testid='data-modal__title'
            aria-label='Modal Title'
        >
            { children }
            <button 
                className='button'
                data-testid='data-modal__close-button'
                aria-label='Close Button'
                onClick={closeHandler}
            >
                Close
            </button>
        </div>
    )
}

const ActualModal = forwardRef(({ title, fullscreen, children, onClose, onOverlayClick, onHover }: ActualModalProps, ref: ForwardedRef<HTMLDivElement>) => {    
    const handleKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
        if( event.key === ESCAPE_KEY ) {
            event.stopPropagation()
            onClose()
        }
    }

    const handleClose = () => onClose()

    return (
        <div
            className='modal__overlay'
            role='dialog'
            aria-modal='true'
            aria-label='Clickable Modal Overlay'
            data-testid='data-modal'
            tabIndex={-1}
            onKeyDown={handleKeyDown}
            onClick={onOverlayClick}
        >
            <div 
                ref={ref}
                className={`modal__body${ fullscreen ? ' fullscreen' : ''}`}
                data-testid='data-modal__body'
                aria-label='Clickable Modal Body'
                onClick={onOverlayClick}
                onMouseEnter={() => onHover(false)}
                onMouseLeave={() => onHover(true)}
            >
                <Header closeHandler={handleClose}>{ title }</Header>
                <div 
                    className='modal__content'
                    data-testid='data-modal__content'
                    aria-label='Modal Content'
                >
                    { children }
                </div>
            </div>
        </div>
    )
})

const Modal = ({ isOpen, title, children, fullscreen = false, dismissOnOutsideClick = true, onClose }: ModalProps) => {
    const container = useRef<HTMLDivElement>(null)
    const [isOutsideClickable, setIsOutsideClickable] = useState(dismissOnOutsideClick)

    useEffect(() => {
        if(container.current) {
            if(isOpen) disableBodyScroll(container.current)
            else enableBodyScroll(container.current)
        }

        return () => {
            const nodes = document.querySelectorAll('.modal__overlay')
            if( nodes.length === 0 ) clearAllBodyScrollLocks()
        }
    }, [isOpen])

    const onOverlayClick = (event: MouseEvent<HTMLDivElement>) => {
        if(dismissOnOutsideClick) {
            event.stopPropagation()
            if(!container.current?.contains(event.currentTarget)) onClose()
        }
    }

    return (
        <>
            {
                isOpen ? 
                createPortal(
                    <TrapFocus 
                        paused={isOutsideClickable}
                        focusTrapOptions={{
                            fallbackFocus: '.modal__overlay'
                        }}
                    >
                        <ActualModal 
                            ref={container}
                            title={title}
                            fullscreen={fullscreen}
                            onClose={onClose}
                            onOverlayClick={onOverlayClick}
                            onHover={setIsOutsideClickable}
                        >
                            {children}
                        </ActualModal>
                    </TrapFocus>,
                    document.body
                ) :
                null
            }
        </>
    )
}

export default Modal