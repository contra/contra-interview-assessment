import React, { useEffect, type FC } from 'react';
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
  }: ModalPropTypes) => {

	useEffect(() => {
		const closeOnEscapeKey = (e) => (e.key === "Escape" ? handleClose() : null);
		document.body.addEventListener("keydown", closeOnEscapeKey);
		return () => {
			document.body.removeEventListener("keydown", closeOnEscapeKey);
		};
	}, [handleClose]);

	if (!isOpen) return null;

	return (
		<ReactPortal wrapperId="react-portal-modal-container">
			<div
				onClick={(e) => e.stopPropagation()}  // Prevent click from closing modal
				className={styles['modal']}>
				<div className={styles['modalContent']}>
					{header ?? <ModalHeader header={header} title={title} handleClose={handleClose} />}
					<ModalBody children={children} />
					{footer ?? <ModalFooter footer={footer} onSubmit={onSubmit} submitButtonText={submitButtonText} />}
				</div>
			</div>
		</ReactPortal>
	);
};

const ModalHeader: FC<ModalHeaderTypes> = ({
	header, 
	title, 
	handleClose 
	}: ModalHeaderTypes) => {
	return  (
		<div className={styles['header']}>
			{title}
			<button
				aria-label="close"
				className={styles['closeButton']}
				onClick={handleClose}
				type="button">
				CLOSE
			</button>
		</div>
	);
}

const ModalFooter: FC<ModalFooterTypes> = ({
	footer, 
	onSubmit, 
	submitButtonText
	} :ModalFooterTypes) => (
	<div className={styles['footer']}>
		<button
			aria-label="close"
			onClick={onSubmit}
			type="button">
		{submitButtonText}
		</button>
	</div>
);

const ModalBody: FC<ModalBodyTypes> = ({children}: ModalBodyTypes) => (
	<div className={styles['body']}>
		{children ?? (<p>{loremIpsum}</p>)}
	</div>
);

const loremIpsum = `Lorem ipsum dolor sit amet consectetur adipisicing elit. Eius laboriosam labore, totam expedita voluptates tempore asperiores sequi, alias cum veritatis, minima dolor iste similique eos id. Porro, culpa? Officiis, placeat?`;

export default Modal;