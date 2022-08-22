export interface ModalProps {
    isOpen: boolean;
    className?: string;
    onClose: () => void;
    isCentered?: boolean;
    closeOnEsc?: boolean;
    ariaLabel?: string;
    backdropClassName?: string;
    blockScrollOnMount?: boolean;
    closeOnOutsideClick?: boolean;
    finalFocusRef?: React.RefObject<HTMLElement>;
    children: React.ReactNode | React.ReactNode[];
    initialFocusRef?: React.RefObject<HTMLElement>;
    size?: "sm" | "md" | "lg" | "xl" | "2xl" | "3xl" | "4xl" | "5xl" | "6xl" | "7xl" | "full";
  };
  
  export type ModalChildrenProps = Pick<ModalProps, "children" | "className">;
  
  export interface useModalProps extends Partial<ModalProps> {
    dialogRef: React.RefObject<HTMLDivElement>;
    backdropRef: React.RefObject<HTMLDivElement>;
  }