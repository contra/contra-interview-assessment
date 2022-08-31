import { createPortal } from 'react-dom';
import { AiFillCloseCircle } from 'react-icons/ai';

type Props = {
  onClose: () => void;
  open: boolean;
};

const Modal = ({ open, onClose }: Props) => {
  if (!open) return null;

  return createPortal(
    <div className="fixed top-0 flex h-screen w-screen items-center justify-center bg-transparent">
      <div className="flex h-2/3 w-2/3 flex-col items-center justify-center rounded-xl bg-white">
        <button
          className="rounded-full text-red-600 "
          onClick={onClose}
          type="button"
        >
          <AiFillCloseCircle size={24} />
        </button>
      </div>
    </div>,
    document.querySelector('#portal') as HTMLElement
  );
};

export default Modal;
