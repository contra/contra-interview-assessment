import { useCallback, type ReactNode } from 'react';
import ClientModalPortal from './subcomponents/ClientModalPortal';

type IModal = {
    children: ReactNode | ReactNode[];
    isOpen?: boolean;
}

const Modal = ({ children, isOpen }: IModal) => {

    const dialogNode = useCallback((node: HTMLDialogElement | null) => {
        if (node !== null && node.open === false && isOpen) {
            node.showModal()
        }
    }, [isOpen]);

    return isOpen ?
        <ClientModalPortal>
            <dialog ref={dialogNode}>{children}</dialog>
        </ClientModalPortal>
        : null;
};

export default Modal;
