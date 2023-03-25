import React from 'react';

import { useEscapeKey, useFocusTrap, useScrollBlock } from '@/utils/hooks.util';
import ReactPortal from './ReactPortal';

export type ModalProps = {
  children: React.ReactElement;
  handleClose: () => void;
  isOpen: boolean;
  name: string;
};

const Modal = ({ children, handleClose, isOpen, name }: ModalProps) => {
  useEscapeKey(handleClose);
  useScrollBlock(isOpen);
  const refOuter = useFocusTrap();

  return (
    <ReactPortal wrapperId="modal-wrapper">
      <div
        aria-hidden={!isOpen}
        aria-labelledby={`Popup Modal ${name}`}
        aria-modal="true"
        className="fixed top-0 left-0 right-0 z-50 w-full p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-[calc(100%-1rem)] md:h-full flex justify-center items-center"
        data-testid="modal-container"
        ref={refOuter}
        role="dialog"
        tabIndex={-1}
      >
        <div className="fixed inset-0 flex items-center justify-center bg-slate-800 opacity-75" />
        <div className="relative">
          <div className="relative bg-white rounded-lg shadow">
            <div className="static p-8">
              {children}

              <button
                className="absolute top-0 right-0 text-gray-800 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white"
                data-testid="modal-close-button"
                onClick={handleClose}
                tabIndex={0}
                type="button"
              >
                <svg
                  className="w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    clipRule="evenodd"
                    d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                    fillRule="evenodd"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </ReactPortal>
  );
};

export default Modal;
