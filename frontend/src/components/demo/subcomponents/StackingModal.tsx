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
        <h3>Use case: Stacking multiple Modals</h3>
        <p> We can also stack modals by triggering a modal opening when another modal is open</p>
        <button onClick={handleModalOpen} type="button">Open modal</button>
        <Modal isOpen={isModalOpen} onClickOutside={handleModalClose} onClose={handleModalClose}>
            <Information/>
            <div>
                <button onClick={handleModalClose} type="button">Close Modal</button>
            </div>
        </Modal>
    </section>;
};

export default StackingModal;
