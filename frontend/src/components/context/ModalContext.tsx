import * as React from "react";
import { createStore, useStore } from "zustand";

export type ModalStore = {
  /** An array of modal closing callbacks */
  modals: Function[];
  /** Add a modal closing callback to the state */
  addModal: (callback: () => void) => void;
  /** Close the topmost modal in the stack */
  escapeModal: (e: React.KeyboardEvent | KeyboardEvent) => void;
  /** Remove the callback from the stack */
  removeModal: (callback: () => void) => void;
};

export const modalStore = createStore<ModalStore>()((set) => ({
  modals: [],
  addModal: (callback) =>
    set((state) => ({ modals: [...state.modals, callback] })),
  escapeModal: (e: React.KeyboardEvent | KeyboardEvent) => {
    set((state) => {
      // get the last modal from list
      const modal = state.modals.splice(-1)[0];
      if (modal && e.key === "Escape") {
        modal();
        return { modals: state.modals };
      }
      return state;
    });
  },
  removeModal: (callback) =>
    set((state) => {
      // remove the close modal callback from modals list
      const modals = state.modals.filter((modal) => modal !== callback);
      return { modals };
    }),
}));

export const ModalContext = React.createContext(modalStore);

export default function ModalContextWrapper({
  children,
}: React.PropsWithChildren) {
  const { escapeModal } = useStore(modalStore);
  React.useEffect(() => {
    document.body.addEventListener("keydown", escapeModal);
    return () => document.body.removeEventListener("keydown", escapeModal);
  }, []);
  return (
    <ModalContext.Provider value={modalStore}>{children}</ModalContext.Provider>
  );
}
