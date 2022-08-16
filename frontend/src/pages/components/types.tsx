export type modalData = {
  buttonText?: string;
  modalContent: string;
  modalFooter?: boolean;
  modalHeader?: string;
  modalName: string;
  submitAction?: () => void;
  type: string;
};

export type ModalContainerType = {
  buttonText?: string;
  handleClose: () => void;
  isOpen: boolean;
  modalArrayData?: modalData[];
  modalContent?: string;
  modalFooter?: boolean;
  modalHeader?: string;
  submitAction?: () => void;
  type?: 'dialog' | 'text';
};
