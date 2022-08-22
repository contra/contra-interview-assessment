import React, { createContext } from "react";

interface ModalContextProps {
  handleModalClose: (event:React.MouseEvent) => void;
}
export const ModalContext = createContext({} as ModalContextProps);