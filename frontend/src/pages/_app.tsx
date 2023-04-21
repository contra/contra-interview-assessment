import Modal from '@/components/Modal'
import React, {useState} from 'react'

function App() {
  const [modalOpen, setModalOpen] = useState(false);

  const handleOpenModal = () => {
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
  };

  return (
    <div>
       <button onClick={handleOpenModal}>Open Modal</button>
        <Modal isOpen={modalOpen} onClose={handleCloseModal}>
          <h1>Modal Content</h1>
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Aliquam, labore odio! Molestiasxs?</p>
        </Modal>
    </div>
  )
}

export default App
