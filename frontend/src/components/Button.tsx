import React, { useState, CSSProperties, ReactNode } from 'react';

// Props
interface Props {
    children: ReactNode
    onClick: () => void
}

// Styles
const contraButton: CSSProperties = {
    position: 'relative',
    textAlign: 'center',
    textTransform: 'capitalize',
    display: 'inline-block',
    width: 'auto',
    transition: 'all 150ms ease-out 0s',
    cursor: 'pointer',
    height: '48px',
    paddingLeft: '24px',
    paddingRight: '24px',
    minWidth: '88px',
    border: '1px solid #cecece',
    borderRadius: '24px',
    color: 'black'
}

const Button = ({ children, onClick }: Props) => {
    const [hover, setHover] = useState<boolean>();

    return (
        <button 
            style={{
                ...contraButton,
                backgroundColor: hover ? '#e8e8e8' : 'white'
            }}
            onClick={onClick}
            onMouseEnter={() => setHover(true)}
            onMouseLeave={() => setHover(false)}>
            {children}
        </button>
    )
};

export default Button;