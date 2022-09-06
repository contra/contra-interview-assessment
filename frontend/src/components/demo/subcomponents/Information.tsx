// An example of modal usage for information display with continue button to close

import { useState } from "react";
import Modal from "@/components/modal";

const Information = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const handleModalClose = () => {
        setIsModalOpen(false);
    }

    const handleModalOpen = () => {
        setIsModalOpen(true);
    }

    return <section>
        <h3>Use case: Displaying information</h3>
        <p> This demonstrates the use of the custom modal component to display information. It also showcases ability to close the modal using a child element - "Close" button. </p>
        <button onClick={handleModalOpen} type="button">Open information modal</button>
        <Modal isOpen={isModalOpen} onClose={handleModalClose}>
            <div>
                <p>This demonstrates the use of the custom modal component to display information. It also showcases ability to close the modal using a child element - "Close" button.</p>
                <button onClick={handleModalClose} type="button">Close Modal</button>
            </div>
        </Modal>
    </section>;
};

export default Information;
