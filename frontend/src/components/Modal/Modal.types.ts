export type ModalHeaderTypes = {
	handleClose: () => void;
	title: string;
}

export type ModalFooterTypes = {
	onSubmit?: () => void;
	submitButtonText?: string
}

export type ModalBodyTypes = {
	children?: React.ReactNode;
}

export type ModalPropTypes = ModalHeaderTypes & ModalFooterTypes & ModalBodyTypes & {
	isOpen: boolean;
	size?: string;
	animate?: boolean;
	escapable?: boolean;
	submitButtonText?: string;
	onClose?: () => void;
	onOpen?: () => void;
	header?: React.ReactNode;
	footer?: React.ReactNode;
	backdropClosable?: boolean
};