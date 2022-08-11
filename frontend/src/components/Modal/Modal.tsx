import React, { type FC, useEffect, useRef, useCallback } from 'react';
import ReactPortal from '../ReactPortal';
import styles from './Modal.module.css';
import {
	type ModalPropertyTypes,
	type ModalHeaderTypes,
	type ModalFooterTypes,
	ModalSizeTypes,
} from './Modal.types';

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
			data-testid="header-title" 
			tabIndex={-2}>
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
			className={styles['button']}
			onClick={onSubmit}
			tabIndex={-1}
			type="button">
			{submitButtonText}
		</button>
		&nbsp; &nbsp;
		<button
			aria-label="cancel"
			className={styles['button']}
			onClick={onCancel}
			tabIndex={0}
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
	backdropClosable = true,
	keyboardEscapable = true,
}: ModalPropertyTypes) => {
	const wrapperRef = useRef() as React.MutableRefObject<HTMLInputElement>;
	const customCloseHandler = useCallback(() => {
		handleClose();
		onClose?.();
	}, [onClose, handleClose]);

	useEffect(() => {
		const closeOnEscapeKey = (event: KeyboardEvent) => {
			event.key === 'Escape' && customCloseHandler();
		};

		const closeOnBackdropClick = (event: MouseEvent) => {
			if (
				wrapperRef &&
				wrapperRef.current &&
				!wrapperRef.current.contains(event.target as Node)
			) {
				customCloseHandler();
			}
		};

		keyboardEscapable && document.addEventListener('keydown', closeOnEscapeKey);
		backdropClosable &&
			document.addEventListener('click', closeOnBackdropClick, {
				capture: true,
			});

		return () => {
			keyboardEscapable &&
				document.removeEventListener('keydown', closeOnEscapeKey);
			backdropClosable &&
				document.removeEventListener('click', closeOnBackdropClick);
		};
	}, [handleClose, keyboardEscapable, backdropClosable]);

	useEffect(() => {
		isOpen && onOpen?.();
	}, [isOpen, onOpen]);

	return (
		<ReactPortal wrapperId="react-portal-modal-container">
			<div className={styles['overlay']} data-testid="overlay"/>
			<div className={styles['windowContainer']}>
				<div className={styles['modalContainer']}>
					<div
						aria-label={title}
						aria-modal
						className={styles['modal']}
						data-testid="modal"
						ref={wrapperRef}
						style={{ width: getModalSize(size) }}>
						<div className={styles['modalContent']}>
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
			</div>
		</ReactPortal>
	);
};

export default Modal;
