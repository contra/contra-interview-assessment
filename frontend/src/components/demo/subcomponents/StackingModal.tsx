import { useState } from "react";
import Modal from "@/components/modal";
import Information from "./Information";

const StackingModal = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const handleModalClose = () => {
        setIsModalOpen(false);
    }

    const handleModalOpen = () => {
        setIsModalOpen(true);
    }

    return <section>
        <h2>Use case: Stacking multiple Modals</h2>
        <p> We can also stack modals by triggering a modal opening when another modal is open</p>
        <button onClick={handleModalOpen} type="button">Open modal</button>
        <Modal isOpen={isModalOpen} onClose={handleModalClose}>
            <Information/>
            <div>
                <button onClick={handleModalClose} type="button">Close Modal</button>
            </div>
        </Modal>
    </section>;
};

export default StackingModal;
