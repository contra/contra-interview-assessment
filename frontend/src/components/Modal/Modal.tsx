import React, { useEffect, useRef, useCallback, FC } from 'react';
import ReactPortal from '../ReactPortal';
import styles from './Modal.module.css';

import {
	ModalPropTypes,
	ModalHeaderTypes,
	ModalFooterTypes,
	ModalBodyTypes,
} from './Modal.types';

const Modal: FC<ModalPropTypes> = ({
	isOpen,
	handleClose,
	title,
	header,
	body,
	children,
	footer,
	size,
	animate = true,
	submitButtonText = 'Submit',
	onSubmit,
	onClose,
	onOpen,
	backdropClosable = true,
	keyboardEscapable = true,
}: ModalPropTypes) => {
	const wrapperRef = useRef() as React.MutableRefObject<HTMLInputElement>;
	const customCloseHandler = useCallback(() => {
		handleClose();
		onClose?.();
	}, [onClose]);

	if (!onSubmit) {
		onSubmit = customCloseHandler;
	}

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
	}, [handleClose]);

	useEffect(() => {
		isOpen && onOpen?.();
	}, [isOpen, onOpen]);

	const getModalSize = (size: string = '') => {
		const sizeMap = {
			SMALL: '400px',
			MEDIUM: '550px',
			LARGE: '800px',
		};
		return sizeMap?.[size] ?? '550px';
	};

	return (
		<ReactPortal wrapperId="react-portal-modal-container">
			<div className={styles['overlay']} />
			<div className={styles['windowContainer']}>
				<div className={styles['modalContainer']}>
					<div
						ref={wrapperRef}
						style={{ width: getModalSize(size) }}
						className={styles['modal']}
					>
						<div data-testid="modal" className={styles['modalContent']}>
							{header ?? (
								<ModalHeader title={title} handleClose={customCloseHandler} />
							)}
							{body ?? (children && <ModalBody children={children} />)}
							{footer ?? (
								<ModalFooter
									onSubmit={onSubmit}
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

const ModalHeader: FC<ModalHeaderTypes> = ({
	title,
	handleClose,
}: ModalHeaderTypes) => {
	return (
		<div tabIndex={1} data-testid="header-title" className={styles['header']}>
			{title === '' ? 'Modal title' : title}
			<button
				aria-label="close"
				className={styles['closeButton']}
				onClick={handleClose}
				type="button"
				data-testid="close-button"
			></button>
		</div>
	);
};

const ModalFooter: FC<ModalFooterTypes> = ({
	onSubmit,
	submitButtonText = 'Submit',
	closeButtonText = 'Cancel',
}: ModalFooterTypes) => (
	<div className={styles['footer']}>
		<button
			tabIndex={3}
			className={styles['button']}
			aria-label="submit"
			onClick={onSubmit}
			type="button"
		>
			{submitButtonText}
		</button>
		&nbsp; &nbsp;
		<button
			tabIndex={4}
			className={styles['button']}
			aria-label="submit"
			onClick={onSubmit}
			type="button"
		>
			{closeButtonText}
		</button>
	</div>
);

const ModalBody: FC<ModalBodyTypes> = ({ children }: ModalBodyTypes) => (
	<div className={styles['body']}>{children}</div>
);

export default Modal;
