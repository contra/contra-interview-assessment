import { createContext } from "react";

interface ModalContextProps {
  handleModalClose: ( event: MouseEvent | KeyboardEvent | TouchEvent) => void;
}
export const ModalContext = createContext({} as ModalContextProps);