type ModalHeader = {
  text: string;
};

type ModalBody = {
  content: string;
};

type ModalFooter = {
  text: string;
};

type ModalContainerT = {
  modalBody: ModalBody;
  modalFooter?: ModalFooter;
  modalHeader?: ModalHeader;
  show: boolean;
};

export default ModalContainerT;
