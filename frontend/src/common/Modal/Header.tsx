import { MouseEventHandler, useContext } from "react";
import classnames from "classnames";

import { ModalContext } from "./ModalContext";
import { ModalChildrenProps } from "./Modal.types";

const ModalHeader = ({ children, className }: ModalChildrenProps) => {
  const { handleModalClose } = useContext(ModalContext);

  return(
    <div
      data-testid="modal-header"
      className={classnames(
        [ "flex justify-between items-baseline p-4 border-b\
        border-b-gray-00", className ],
      )}
    >
      {children}
      <button
      type="button"
      onClick={handleModalClose}
      data-testid="modal-header-close-button"
      data-modal-toggle="defaultModal"
      className=" text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 \
              rounded-lg text-sm p-1.5 ml-auto inline-flex items-center \
              focus:outline-none focus:ring-2 focus:ring-offset-2"
      >
        <svg aria-hidden="true" className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
        <span className="sr-only">Close modal</span>
      </button>
    </div>
  )
}

export default ModalHeader;