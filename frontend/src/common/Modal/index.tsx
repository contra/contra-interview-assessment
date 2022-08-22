import { useRef } from "react";
import classnames from "classnames";
import { motion, AnimatePresence } from "framer-motion"

import Portal from "../Portal";
import ModalBody from "./Body";
import ModalHeader from "./Header";
import ModalFooter from "./Footer";
import { ModalProps } from "./Modal.types";
import { useModal } from "../hooks/useModal";
import { ModalContext } from "./ModalContext";
import { useModalManager } from "./ModalManager";
import { MODAL_ANIMATE_VARIANT, MODAL_ANIMATE_TRANSITION } from "./constants";

const Modal = (
  {
    isOpen,
    onClose,
    children,
    size = "md",
    ariaLabel,
    className,
    backdropClassName,
    finalFocusRef,
    initialFocusRef,
    isCentered = true,
    closeOnEsc = true,
    blockScrollOnMount = true,
    closeOnOutsideClick = true,
  } : ModalProps) => {

  const dialogRef = useRef<HTMLDivElement>(null)
  const backdropRef = useRef<HTMLDivElement>(null)

  useModalManager(dialogRef, isOpen);

  const { handleModalClose } = useModal({
    isOpen,
    initialFocusRef,
    finalFocusRef,
    dialogRef,
    onClose,
    backdropRef,
    closeOnOutsideClick,
    closeOnEsc,
    blockScrollOnMount,
  });
  return(
    <Portal rootId="contra-portal">
      <ModalContext.Provider value={{handleModalClose}}>
        <AnimatePresence>
        {isOpen && (
            <motion.div
              exit="exit"
              role="dialog"
              animate="open"
              initial="closed"
              aria-modal="true"
              ref={backdropRef}
              className="relative z-10"
              data-testid="modal-backdrop"
              variants={MODAL_ANIMATE_VARIANT}
              transition={MODAL_ANIMATE_TRANSITION}
              aria-labelledby={ariaLabel ?? "modal-title"}
            >
            <div
              className={classnames(["fixed inset-0 bg-gray-500 \
                bg-opacity-50 transition-opacity w-full h-full", backdropClassName]
              )}
            ></div>
            <div className="fixed z-10 inset-0 overflow-y-auto" >
              <div className={classnames(
                  "flex justify-center min-h-full text-center",
                  {
                    "p-6": size !== "full",
                    "p-0": size === "full",
                  },
                  {
                    "items-center justify-center": isCentered,
                    "items-start": !isCentered,
                  }
                )}>
                <div
                  ref={dialogRef}
                  data-testid="modal-dialog"
                  className={
                    classnames(["relative bg-white rounded-lg text-left \
                      overflow-hidden shadow-xl transform transition-all", className],
                      {
                        "max-w-sm": size === "sm",
                        "max-w-md": size === "md",
                        "max-w-lg": size === "lg",
                        "max-w-xl": size === "xl",
                        "max-w-2xl": size === "2xl",
                        "max-w-3xl": size === "3xl",
                        "max-w-4xl": size === "4xl",
                        "max-w-5xl": size === "5xl",
                        "max-w-6xl": size === "6xl",
                        "max-w-7xl": size === "7xl",
                        "w-screen h-screen" : size === "full",
                      }
                  )}
                >
                  {children}
                </div>
              </div>
            </div>
          </motion.div>
          )}
        </AnimatePresence>
      </ModalContext.Provider>
    </Portal>
  )
}

export default Modal;

Modal.Header = ModalHeader;
Modal.Body = ModalBody;
Modal.Footer = ModalFooter;