import { useCallback, useEffect, useRef, type DialogHTMLAttributes } from 'react';
import ClientModalPortal from './subcomponents/ClientModalPortal';

type IDialog = DialogHTMLAttributes<HTMLDialogElement> & {
    onClickOutside?: () => void;
    onClose: () => void;
}

const Dialog = ({ children, onClickOutside, onClose, ...dialogAttributes }: IDialog) => {
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

    return <dialog onClose={onClose} ref={dialogRef} {...dialogAttributes}> {children} </dialog>
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
