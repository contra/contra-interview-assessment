import React, { useEffect, useRef, useCallback, type FC } from 'react';
import styles from './Modal.module.css';
import ReactPortal from "../ReactPortal";
import {ModalPropTypes, ModalHeaderTypes, ModalFooterTypes, ModalBodyTypes} from './Modal.types';

const Modal: FC<ModalPropTypes> = ({
	isOpen,
	handleClose,
	title,
	header,
	children,
	footer,
	size,
	animate = true,
	escapable = true,
	submitButtonText = "Submit",
	onSubmit,
	onClose,
	onOpen,
	backdropClosable = true
  }: ModalPropTypes) => {

	const wrapperRef = useRef(null);

	const customCloseHandler = useCallback(
		() => {
		handleClose();
		onClose?.();
	}, [onClose]);

	const closeOnBackdropClick = useCallback(({target}) => {
		if (
			wrapperRef &&
			wrapperRef.current &&
			!wrapperRef.current.contains(target) &&
			backdropClosable
		  ) {
			customCloseHandler();
		  }
	}, []);

	if(!onSubmit) {
		onSubmit = customCloseHandler;
	}

	useEffect(() => {
		const closeOnEscapeKey = (event: KeyboardEvent) => {
			event.key === "Escape" && customCloseHandler();
		};

		document.addEventListener("keydown", closeOnEscapeKey);
		document.addEventListener("click", closeOnBackdropClick, { capture: true });

		return () => {
			document.removeEventListener("keydown", closeOnEscapeKey, );
			document.removeEventListener("click", closeOnBackdropClick);
		};
	}, [handleClose]);

	useEffect(() => {
		isOpen && onOpen?.();
	}, [isOpen, onOpen])

	return (
		<ReactPortal wrapperId="react-portal-modal-container">
			<div className={styles['overlay']} />
			<div className={styles['windowContainer']}>
				<div className={styles['modalContainer']}>
					<div ref={wrapperRef} className={styles['modal']}>
						<div className={styles['modalContent']}>
							{header ?? <ModalHeader title={title} handleClose={customCloseHandler} />}
							<ModalBody children={children} />
							{footer ?? <ModalFooter onSubmit={onSubmit} submitButtonText={submitButtonText} />}
						</div>
					</div>
				</div>
			</div>
		</ReactPortal>
	);
};

const ModalHeader: FC<ModalHeaderTypes> = ({
	title, 
	handleClose 
	}: ModalHeaderTypes) => {
	return  (
		<div className={styles['header']}>
			{title}
			<button
				aria-label="close"
				className="uk-modal-close-default"
				onClick={handleClose}
				type="button">
			</button>
		</div>
	);
}

const ModalFooter: FC<ModalFooterTypes> = ({
	onSubmit, 
	submitButtonText
	} :ModalFooterTypes) => (
	<div className={styles['footer']}>
		<button
			aria-label="submit"
			onClick={onSubmit}
			type="button"
			className='uk-button uk-button-danger uk-button-small'>
		{submitButtonText}
		</button>
	</div>
);

const ModalBody: FC<ModalBodyTypes> = ({children}: ModalBodyTypes) => (
	<div className={styles['body']}>
		{children ?? (<p className={styles['subtitle']}>{loremIpsum}</p>)}
	</div>
);

const loremIpsum = `Lorem ipsum dolor sit amet consectetur adipisicing elit. Eius laboriosam labore, totam expedita voluptates tempore asperiores sequi, alias cum veritatis, minima dolor iste similique eos id. Porro, culpa? Officiis, placeat?`;

export default Modal;