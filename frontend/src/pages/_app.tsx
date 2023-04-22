import Modal from '@/components/Modal'
import React, { useState } from 'react'
import styled from 'styled-components'

const AppContainer = styled.div`
  height: 100vh;
  width: 100%;
`

const OpenModalButtonContainer = styled.div`
  width: 100%;
  height: 90vh;
  // background-color: red;
  display: flex;
  justify-content: center;
  align-items: center;
`


const OpenModalButton = styled.div`
  border: 2px solid #000;
  padding: 10px 20px;
  border-radius: 5px;
  font-family: roboto;
  transition: background-color 0.3s ease-in-out;

  &:hover {
    background-color: #008CBA; /* Blue */
    color: #fff;
    border: none;
  }
`

function App() {
  const [modalOpen, setModalOpen] = useState(false);

  const handleOpenModal = () => {
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
  };

  return (
    <AppContainer>
      <OpenModalButtonContainer>
        <OpenModalButton onClick={handleOpenModal}>Check Message</OpenModalButton>
      </OpenModalButtonContainer>
        <Modal isOpen={modalOpen} onClose={handleCloseModal}>
          <h1>Congrats Traveler</h1>
          <p>Rest here weary traveler, you've seen too many Mike O'Hearn memes today</p>
        </Modal>
    </AppContainer>
  )
}

export default App
