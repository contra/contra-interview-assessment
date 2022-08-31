import { type KeyboardEvent } from 'react';
import { createPortal } from 'react-dom';
import { AiFillCloseCircle } from 'react-icons/ai';

type Props = {
  children: React.ReactNode;
  onClose: () => void;
  open: boolean;
};

const Modal = ({ open, onClose, children }: Props) => {
  if (!open) return null;

  const onKeyPressHandler = (event: KeyboardEvent) => {
    if (event.key === 'Enter') onClose();
  };

  return createPortal(
    <div
      className="fixed top-0 flex h-screen w-screen items-center justify-center bg-transparent antialiased"
      onClick={onClose}
      onKeyPress={onKeyPressHandler}
      role="button"
      tabIndex={0}
    >
      <div
        className="h-[80%] w-[90%] max-w-4xl overflow-auto rounded-md bg-neutral-100"
        onClick={(event) => {
          event.stopPropagation();
        }}
        onKeyPress={onKeyPressHandler}
        role="button"
        tabIndex={0}
      >
        <div className="mx-4 mt-4 mb-6 flex justify-end ">
          <button
            className="rounded-full text-neutral-900"
            onClick={onClose}
            type="button"
          >
            <AiFillCloseCircle size={26} />
          </button>
        </div>
        {children}
      </div>
    </div>,
    document.querySelector('#portal') as HTMLElement
  );
};

export default Modal;
