import { type ReactNode } from 'react';
import ClientModalPortal from './ClientModalPortal';

type IModal = {
    children: ReactNode | ReactNode[];
}

const Modal = ({ children }: IModal) => {
    return <ClientModalPortal>{children}</ClientModalPortal>;
};

export default Modal;
