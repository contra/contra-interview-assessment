import { useCallback, type DialogHTMLAttributes, type ReactNode } from 'react';
import ClientModalPortal from './subcomponents/ClientModalPortal';

type IModal = DialogHTMLAttributes<HTMLDialogElement> & {
    children: ReactNode | ReactNode[];
    isOpen?: boolean;
}

const Modal = ({ children, isOpen, ...dialogAttributes }: IModal) => {

    const dialogNode = useCallback((node: HTMLDialogElement | null) => {
        if (node !== null && node.open === false && isOpen) {
            node.showModal()
        }
    }, [isOpen]);

    return isOpen ?
        <ClientModalPortal>
            <dialog ref={dialogNode} {...dialogAttributes}>{children}</dialog>
        </ClientModalPortal>
        : null;
};

export default Modal;
