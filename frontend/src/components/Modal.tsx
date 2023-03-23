import ReactPortal from './ReactPortal';
import { useFocus, useScrollBlock } from '@/Utils/hooks.util';
import React, { useRef } from 'react';

export type ModalProps = {
  children: React.ReactElement;
  handleClose: () => void;
  isOpen: boolean;
};

const Modal = ({ isOpen, handleClose, children }: ModalProps) => {
  useScrollBlock(isOpen);
  const modalRef = useRef<HTMLDivElement>(null);
  useFocus(handleClose, modalRef);

  return (
    <>
      {isOpen && (
        <ReactPortal wrapperId="react-portal-modal-container">
          <div
            id="staticModal"
            data-modal-backdrop="static"
            role="dialog"
            aria-hidden="true"
            aria-labelledby="modal-title"
            tabIndex={-1}
            aria-modal="true"
            className="fixed top-0 left-0 right-0 z-50 w-full p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-[calc(100%-1rem)] md:h-full flex justify-center items-center"
            data-testid="modal-container"
            ref={modalRef}
          >
            <div className="fixed inset-0 flex items-center justify-center bg-slate-800 opacity-75" />
            <div className="relative">
              <div className="relative bg-white rounded-lg shadow">
                <div className="static p-8">
                  {children}

                  <button
                    type="button"
                    className="absolute top-0 right-0 text-gray-800 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white"
                    data-modal-hide="staticModal"
                    onClick={handleClose}
                  >
                    <svg
                      className="w-5 h-5"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fillRule="evenodd"
                        d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                        clipRule="evenodd"
                      ></path>
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </ReactPortal>
      )}
    </>
  );
};

export default Modal;
