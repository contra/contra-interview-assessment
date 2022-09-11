import { useEffect, useRef, useState, type ReactNode, type ReactPortal } from "react";
import { createPortal } from "react-dom";

// For server-side rendered pages, using createPortal would cause an error because the modal container is not mounted yet.
// By using this component, we can detect when the modal container is mounted before rendering the modal.

type IClientPortal = {
    children: ReactNode;
}

const ClientModalPortal = ({ children }: IClientPortal): ReactPortal | null => {
    const ref = useRef<Element | null>();
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        ref.current = document.querySelector("#modal");
        setMounted(true);
    }, []);
    
    return ref.current && mounted ? createPortal(children, ref.current) : null;
}

export default ClientModalPortal;