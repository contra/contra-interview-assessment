import { useEffect, useState } from "react"
import { createPortal } from "react-dom"

const Portal = ({ children, disabled = false }: { children: React.ReactNode, disabled?: boolean }) => {
    const [mounted, setMounted] = useState(false)

    useEffect(() => {
        setMounted(true)
        return () => setMounted(false)
    }, [])

    if (disabled) {
        return <>{children}</>;
    } else {
        return mounted
            ? createPortal(children, document.querySelector("#portal") as Element)
            : null
    }
   
}

export default Portal;