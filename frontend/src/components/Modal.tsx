/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import { motion } from 'framer-motion';
import { createPortal } from 'react-dom';
import { AiFillCloseCircle } from 'react-icons/ai';

type Props = {
  children: React.ReactNode;
  location?: 'bottom-left' | 'bottom-right' | 'top-left' | 'top-right';
  onClose: () => void;
  open: boolean;
  small?: boolean;
};

const Modal = ({ children, location, onClose, open, small }: Props) => {
  if (!open) return null;

  return createPortal(
    <div
      className={
        small
          ? `fixed top-0 flex h-screen w-screen flex-col bg-black ${
              location === 'top-left'
                ? 'items-start justify-start'
                : location === 'top-right'
                ? 'items-end justify-start'
                : location === 'bottom-left'
                ? 'items-start justify-end'
                : location === 'bottom-right'
                ? 'items-end justify-end'
                : ''
            }`
          : 'fixed top-0 flex h-screen w-screen items-center justify-center bg-transparent antialiased'
      }
      onClick={onClose}
    >
      <div
        className={
          small
            ? 'm-4 flex w-48 flex-row-reverse items-center justify-between rounded-md bg-neutral-100 pl-6'
            : 'flex h-[80%] w-[90%] max-w-4xl flex-col overflow-auto rounded-md bg-neutral-100'
        }
        onClick={(event) => {
          event.stopPropagation();
        }}
      >
        <div className="mx-4 mt-4 mb-6 flex justify-end ">
          <motion.button
            className="rounded-full text-neutral-900 hover:text-red-700"
            onClick={onClose}
            type="button"
            whileHover={{ scale: 1.1, transition: { duration: 0.2 } }}
            whileTap={{ scale: 0.9, transition: { duration: 0.2 } }}
          >
            <AiFillCloseCircle size={26} />
          </motion.button>
        </div>
        {children}
      </div>
    </div>,
    document.querySelector('#portal') as HTMLElement
  );
};

export default Modal;
