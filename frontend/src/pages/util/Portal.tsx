import React, { useEffect, useRef, useState } from 'react';
import { createPortal } from "react-dom";

interface Props {
    children: JSX.Element;
    selector: string;
}


const Portal: React.FC<Props> = ({ children, selector }) => {
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
        return () => setMounted(false);
    }, [selector]);

    return mounted ? createPortal(children, document.querySelector(selector)!) : null;
};

export default Portal;