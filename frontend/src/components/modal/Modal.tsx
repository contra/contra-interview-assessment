import { createContext, useCallback, useEffect, useMemo, useRef, type SyntheticEvent, type DialogHTMLAttributes } from 'react';
import usePreventScroll from './hooks/usePreventScroll';
import useRestoreFocus from './hooks/useRestoreFocus';
import ClientModalPortal from './subcomponents/ClientModalPortal';
import loadDialogPolyfill from './utils/loadDialogPolyfill';

type IContext = {
    onClose: () => void
}

export const ModalContext = createContext<IContext>({ onClose: () => { } });

type IDialog = DialogHTMLAttributes<HTMLDialogElement> & {
    onClickOutside?: () => void;
    onClose: () => void;
}

const Dialog = ({ children, onClickOutside, onClose, ...dialogAttributes }: IDialog) => {
    useRestoreFocus()
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

    const handleClose = useCallback((event: SyntheticEvent) => {
        event.stopPropagation();
        onClose();
    }, [onClose]);

    const contextValues = useMemo(() => ({
        onClose
    }), [onClose])

    useEffect(() => {
        const node = dialogRef.current;

        if (node && !node.open) {
            // Check browser support for <dialog>
            if (typeof HTMLDialogElement === 'function') {
                node.showModal();
            } else {
                // Load <dialog> polyfill if no browser support
                loadDialogPolyfill(node);
            }
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
        <dialog aria-label='Dialog' onClose={handleClose} ref={dialogRef} {...dialogAttributes}>
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
