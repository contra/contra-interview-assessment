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
  handleToggleModal: (event?: Event) => void;
  modalArrayData?: modalData[];
  modalFooter: boolean;
  modalHeader?: string;
  submitAction?: () => void;
  type?: 'dialog' | 'text';
};
