import React from 'react'

type Props = {
  id: number;
  openModal: VoidFunction
  closeModal: (id: number) => void
}

export default function ModalContent({ id, openModal, closeModal }: Props) {
  return (
    <div>
      <h2>This is Modal no. {id}</h2>
      <p>This is Modal component.</p>
      <button onClick={openModal}>Open Modal</button>
      <button onClick={() => closeModal(id)}>Close Modal</button>
    </div>
  )
}
