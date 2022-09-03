import { KeyboardEvent } from 'react';
import ReactDOM from 'react-dom';
import FocusTrap from 'focus-trap-react';
import { SyntheticEvent } from 'react';

interface ModalProps {
  onClose: () => void;
  onClick?: () => void;
  children: JSX.Element;
  width?: number | string;
  height?: number | string;
  zIndex?: number;
  backdrop?: boolean;
  background?: string;
}

export default function Modal({
  onClose,
  onClick,
  children,
  width,
  height,
  zIndex,
  backdrop,
  background,
}: ModalProps) {
  const handleKeyDown = (event: KeyboardEvent<HTMLImageElement>) => {
    console.log(event.key);
    if (event.key === 'Escape') {
      onClose();
    }
  };
  return ReactDOM.createPortal(
    <FocusTrap>
      <div className={backdrop ? 'backdrop' : 'no-backdrop'}>
        <div
          className="modal"
          style={{ height, width, zIndex, background }}
          onClick={onClick}
          onKeyDown={handleKeyDown}
        >
          <span
            className="modal-close"
            onClick={(e) => {
              e.stopPropagation();
              onClose();
            }}
          >
            &times;
          </span>
          {children}
        </div>
      </div>
    </FocusTrap>,
    document.body
  );
}
