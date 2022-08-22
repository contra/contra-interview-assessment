import classnames from "classnames";
import { ModalChildrenProps } from "./Modal.types";

const ModalBody = ({ children, className }: ModalChildrenProps) => {
  return(
    <div
      data-testid="modal-body"
      className={classnames(["p-6 space-y-6 flex-grow", className])}
    >
      {children}
    </div>
  )
}

export default ModalBody;