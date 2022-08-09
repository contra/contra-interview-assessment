export type ModalHeaderTypes = {
	handleClose: () => void;
	title: string;
	header?: React.ReactNode;
}

export type ModalFooterTypes = {
	footer?: React.ReactNode;
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
};