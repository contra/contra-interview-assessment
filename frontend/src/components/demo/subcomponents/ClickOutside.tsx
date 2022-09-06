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
        <h3>Use case: A modal that can be closed by clicking outside</h3>
        <p> This demonstrates the customizability of the modal to close when the backdrop is clicked</p>
        <button onClick={handleModalOpen} type="button">Open modal</button>
        <Modal isOpen={isModalOpen} onClickOutside={handleModalClose} onClose={handleModalClose}>
            <div>
                <button onClick={handleModalClose} type="button">Close Modal</button>
            </div>
        </Modal>
    </section>;
};

export default ClickOutside;
