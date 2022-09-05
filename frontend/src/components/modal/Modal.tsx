import { useCallback, useEffect, useRef, type DialogHTMLAttributes } from 'react';
import ClientModalPortal from './subcomponents/ClientModalPortal';

type IDialog = DialogHTMLAttributes<HTMLDialogElement> & {
    onClickOutside?: () => void;
}

const Dialog = ({ children, onClickOutside, ...dialogAttributes }: IDialog) => {
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

        document.body.addEventListener("click", handleClickOutside);

        return () => {
            document.body.removeEventListener("click", handleClickOutside);
        }
    }, [handleClickOutside])

    return <dialog ref={dialogRef} {...dialogAttributes}> {children} </dialog>
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
