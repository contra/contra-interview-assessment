import { useState } from "react";
import Modal from "@/components/modal";

const ClickOutside = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const handleModalClose = () => {
        setIsModalOpen(false);
    }

    const handleModalOpen = () => {
        setIsModalOpen(true);
    }

    return <section>
        <h2>Use case: A modal that can be closed by clicking outside</h2>
        <p> This demonstrates the customizability of the modal to close when the backdrop is clicked</p>
        <button onClick={handleModalOpen} type="button">Open modal</button>
        <Modal aria-describedby="modal-description" aria-labelledby="modal-title" isOpen={isModalOpen} onClickOutside={handleModalClose} onClose={handleModalClose}>
            <div>
                <p id="modal-title">You can close this modal by clicking outside</p>
                <p id="modal-description">Click outside the modal body</p>
            </div>
        </Modal>
    </section>;
};

export default ClickOutside;
