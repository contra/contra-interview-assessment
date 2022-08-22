import classnames from "classnames";

import { ModalChildrenProps } from "./Modal.types";

const ModalFooter = ({ children, className } : ModalChildrenProps) => {
  return(
    <div
      data-testid="modal-footer"
      className={classnames(
        ["flex items-center p-6 space-x-2 rounded-b border-t\
        border-gray-200", className]
      )}
    >
      {children}
    </div>
  )
};

export default ModalFooter;