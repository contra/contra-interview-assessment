export type ModalHeaderTypes = {
	handleClose: () => void;
	title?: string;
  };
  
  export type ModalFooterTypes = {
	onSubmit?: () => void;
	submitButtonText?: string;
	closeButtonText?: string;
  };
  
  export type ModalBodyTypes = {
	children?: React.ReactNode;
  };
  
  export type ModalPropTypes = ModalHeaderTypes &
	ModalFooterTypes &
	ModalBodyTypes & {
	  isOpen: boolean;
	  size?: ModalSizeTypes;
	  animate?: boolean;
	  escapable?: boolean;
	  submitButtonText?: string;
	  onClose?: () => void;
	  onOpen?: () => void;
	  header?: React.ReactNode;
	  body?: React.ReactNode;
	  footer?: React.ReactNode;
	  backdropClosable?: boolean;
	  keyboardEscapable?: boolean;
	};
  
  export enum ModalSizeTypes {
	SMALL = 'SMALL',
	MEDIUM = 'MEDIUM',
	LARGE = 'LARGE',
  }
  