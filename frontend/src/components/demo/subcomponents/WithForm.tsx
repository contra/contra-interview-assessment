import { useState } from "react";
import Modal from "@/components/modal";

const WithForm = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const handleModalClose = () => {
        setIsModalOpen(false);
    }

    const handleModalOpen = () => {
        setIsModalOpen(true);
    }

    return <section>
        <h3>Use case: A modal with form</h3>
        <p> This demonstrates the use of the custom modal component to accept form inputs and close on submit or cancel.
            It also shows the usage of <code>useCloseModal</code> hook for accessing the onClose function in children of the <code>Modal</code> component. </p>
        <button onClick={handleModalOpen} type="button">Open Form modal</button>
        <Modal isOpen={isModalOpen} onClose={handleModalClose}>
            <div>
                <button onClick={handleModalClose} type="button">Close Modal</button>
            </div>
        </Modal>
    </section>;
};

export default WithForm;
