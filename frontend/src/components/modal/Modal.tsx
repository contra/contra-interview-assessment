import { createContext, useCallback, useMemo, useRef, type SyntheticEvent, type DialogHTMLAttributes } from 'react';
import useClickOutside from './hooks/useClickOutside';
import usePreventScroll from './hooks/usePreventScroll';
import useRestoreFocus from './hooks/useRestoreFocus';
import useShowModal from './hooks/useShowModal';
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
    useRestoreFocus();
    usePreventScroll();

    const dialogRef = useRef<HTMLDialogElement>(null);

    useShowModal(dialogRef);
    useClickOutside(dialogRef, onClickOutside);

    const contextValues = useMemo(() => ({
        onClose
    }), [onClose]);

    const handleClose = useCallback((event: SyntheticEvent) => {
        event.stopPropagation();
        onClose();
    }, [onClose]);

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
