import { createContext, useCallback, useEffect, useMemo, useRef, type DialogHTMLAttributes } from 'react';
import usePreventScroll from './hooks/usePreventScroll';
import ClientModalPortal from './subcomponents/ClientModalPortal';

type IContext = {
    onClose: () => void
}

export const ModalContext = createContext<IContext>({ onClose: () => { } });

type IDialog = DialogHTMLAttributes<HTMLDialogElement> & {
    onClickOutside?: () => void;
    onClose: () => void;
}

const Dialog = ({ children, onClickOutside, onClose, ...dialogAttributes }: IDialog) => {
    usePreventScroll();
    const dialogRef = useRef<HTMLDialogElement>(null)

    const handleClickOutside = useCallback((event: MouseEvent) => {
        if (!onClickOutside) return;
        const element = event.target as Node;

        // Detect click outside dialog content
        if (element.nodeName === "DIALOG") {
            event.preventDefault();
            event.stopPropagation();
            onClickOutside();
        }
    }, [onClickOutside]);

    const contextValues = useMemo(() => ({
        onClose
    }), [onClose])

    useEffect(() => {
        const node = dialogRef.current;
        
        if (!node?.open) {
            node?.showModal();
        }
    }, [])

    useEffect(() => {
        const node = dialogRef.current;

        node?.addEventListener("click", handleClickOutside);

        return () => {
            node?.removeEventListener("click", handleClickOutside);
        }
    }, [handleClickOutside])

    return <ModalContext.Provider value={contextValues}>
        <dialog onClose={onClose} ref={dialogRef} {...dialogAttributes}>
            {children}
        </dialog>
    </ModalContext.Provider>
}

type IModal = IDialog & {
    isOpen?: boolean;
}

const Modal = ({ children, isOpen, onClickOutside, ...dialogAttributes }: IModal) => {
    return isOpen ?
        <ClientModalPortal>
            <Dialog onClickOutside={onClickOutside} {...dialogAttributes}>{children}</Dialog>
        </ClientModalPortal>
        : null;
};

export default Modal;
