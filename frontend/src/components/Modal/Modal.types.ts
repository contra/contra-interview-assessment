import type React from "react";

export type ModalHeaderTypes = {
	handleClose: () => void;
	title?: string;
};

export type ModalFooterTypes = {
	cancelButtonText?: string;
	onCancel?: () => void;
	onSubmit?: () => void;
	submitButtonText?: string;
};

export type ModalPropertyTypes = ModalFooterTypes & ModalHeaderTypes & {
		animate?: boolean;
		backdropClosable?: boolean;
		children?: React.ReactNode;
		escapable?: boolean;
		footer?: React.ReactNode;
		header?: React.ReactNode;
		isOpen: boolean;
		keyboardEscapable?: boolean;
		onClose?: () => void;
		onOpen?: () => void;
		size?: ModalSizeTypes;
		submitButtonText?: string;
	};

export enum ModalSizeTypes {
	LARGE = 'LARGE',
	MEDIUM = 'MEDIUM',
	SMALL = 'SMALL'
}
