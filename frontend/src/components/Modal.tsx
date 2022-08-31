import { createPortal } from 'react-dom';
import { AiFillCloseCircle } from 'react-icons/ai';

type Props = {
  children: React.ReactNode;
  onClose: () => void;
  open: boolean;
};

const Modal = ({ open, onClose, children }: Props) => {
  if (!open) return null;

  return createPortal(
    <div className="fixed top-0 flex h-screen w-screen items-center justify-center bg-transparent antialiased">
      <div className="h-[80%] w-[90%] max-w-4xl rounded-xl bg-neutral-100">
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
