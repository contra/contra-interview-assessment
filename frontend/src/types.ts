export type ModalProps = {
  index: number;
  setModals: (updatedModals: iModal[]) => void;
  modals: iModal[];
}

export type NavbarProps = {
  openModal: () => void;
  closeModals: () => void;
}

export interface iModal {
  active?: string;
  valueA?: number;
  valueB?: number;
  diffX?: number;
  diffY?: number;
  dragging?: boolean;
  styles?: {
    zIndex?: number;
    top?: number;
    left?: number;
  }
}
