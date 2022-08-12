import React, { type FC, useEffect, useRef, useCallback } from 'react';
import ReactPortal from '../ReactPortal';
import styles from './Modal.module.css';
import {
	type ModalPropertyTypes,
	type ModalHeaderTypes,
	type ModalFooterTypes,
	ModalSizeTypes,
} from './Modal.types';

// default modal sizes
const sizeMap = {
	LARGE: '800px',
	MEDIUM: '550px',
	SMALL: '400px',
};

const getModalSize = (size: string) => {
	return sizeMap[size as ModalSizeTypes];
};

const ModalHeader: FC<ModalHeaderTypes> = ({
	title,
	handleClose,
}: ModalHeaderTypes) => {
	return (
		<div
			className={styles['header']}
			data-testid="header-title">
			{title === '' ? 'Modal title' : title}
			<button
				aria-label="close"
				className={styles['closeButton']}
				data-testid="close-button"
				onClick={handleClose}
				type="button"
			/>
		</div>
	);
};

const ModalFooter: FC<ModalFooterTypes> = ({
	onSubmit,
	onCancel,
	submitButtonText,
	cancelButtonText,
}: ModalFooterTypes) => (
	<div className={styles['footer']}>
		<button
			aria-label="submit"
			autoFocus
			className={styles['button']}
			onClick={onSubmit}
			type="button">
			{submitButtonText}
		</button>
		&nbsp; &nbsp;
		<button
			aria-label="cancel"
			className={styles['button']}
			onClick={onCancel}
			type="button">
			{cancelButtonText}
		</button>
	</div>
);

const Modal: FC<ModalPropertyTypes> = ({
	isOpen,
	handleClose,
	title,
	header,
	children,
	footer,
	size = ModalSizeTypes.MEDIUM,
	animate = true,
	submitButtonText = 'Submit',
	cancelButtonText = 'Cancel',
	onSubmit,
	onClose,
	onOpen,
	onCancel,
	backdropClosable = false,
	keyboardEscapable = false,
}: ModalPropertyTypes) => {
	const modalRef = useRef<HTMLDivElement | null>(null);
	const customCloseHandler = useCallback(() => {
		handleClose();
		onClose?.();
	}, [onClose, handleClose]);

	useEffect(() => {
		// close modal on ESC keypress if keyboardEscapable enabled
		const closeOnEscapeKey = (event: KeyboardEvent) => {
			event.key === 'Escape' && customCloseHandler();
		};

		keyboardEscapable && document.addEventListener('keydown', closeOnEscapeKey);
		return () => {
			keyboardEscapable && document.removeEventListener('keydown', closeOnEscapeKey);
		};
	}, [keyboardEscapable]);

	useEffect(() => {
		// close modal on click outside modal if backdropClosable enabled
		const closeOnBackdropClick = (event: MouseEvent) => {
			if (
				modalRef &&
				modalRef.current &&
				!modalRef.current.contains(event.target as Node)
			) {
				customCloseHandler();
			}
		};

		backdropClosable && document.addEventListener('click', closeOnBackdropClick, { capture: true, });
		return () => {
			backdropClosable && document.removeEventListener('click', closeOnBackdropClick);
		};
	}, [backdropClosable]);

	useEffect(() => {
		const KEYCODE_TAB = 9;
		// trap tab navigation inside modal
		const handleTab = (event: KeyboardEvent) => {
			const elements = modalRef.current?.querySelectorAll('a[href]:not([disabled]), button:not([disabled]), textarea:not([disabled]), input[type="text"]:not([disabled]), input[type="radio"]:not([disabled]), input[type="checkbox"]:not([disabled]), select:not([disabled])');
			const firstElement = elements?.[0] as HTMLElement;
			const lastElement = elements?.[elements.length - 1] as HTMLElement;
			if (event.key === 'Tab' || event.keyCode === KEYCODE_TAB) {
				if (event.shiftKey) /* shift + tab */ {
					if (document.activeElement === firstElement) {
						lastElement.focus();
						event.preventDefault();
					}
				} else /* tab */ if (document.activeElement === lastElement) {
					firstElement.focus();
					event.preventDefault();
				}
			}
		}

		document.body.addEventListener('keydown', handleTab);
		return () => {
			document.body.removeEventListener('keydown', handleTab);
		}
	}, []);

	useEffect(() => {
		// onOpen callback if passed
		isOpen && onOpen?.();
	}, [onOpen]);

	return (
		<ReactPortal wrapperId="react-portal-modal-container">
			<div className={styles['overlay']} data-testid="overlay" />
			<div className={styles['modalContainer']}>
				<div
					aria-label={title}
					aria-modal
					className={`${styles['modal']} ${animate ? styles['animate'] : false}`}
					data-testid="modal"
					ref={modalRef}
					role="dialog"
					style={{ width: getModalSize(size) }}
					tabIndex={-1}>
					<div className={styles['modalContent']} tabIndex={0}>
						{header ?? (
							<ModalHeader handleClose={customCloseHandler} title={title} />
						)}
						{children && <div className={styles['body']}>{children}</div>}
						{footer ?? (
							<ModalFooter
								cancelButtonText={cancelButtonText}
								onCancel={onCancel ?? customCloseHandler}
								onSubmit={onSubmit ?? customCloseHandler}
								submitButtonText={submitButtonText}
							/>
						)}
					</div>
				</div>
			</div>
		</ReactPortal>
	);
};

export default Modal;
