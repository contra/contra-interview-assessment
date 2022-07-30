import {fireEvent, render} from '@testing-library/react';
import Index from './index'
import '@testing-library/jest-dom'


describe('modal', () => {
  let index;
  beforeEach(() => {
    const portalContainer = document.createElement('div');
    portalContainer.id = 'portal';
    document.body.appendChild(portalContainer)
    index = render(<Index/>)
  })
  it('opens a modal when open modal button is clicked', () => {
    const openModalButton = index.getByRole('button', {name: 'Open Modal'})
    expect(openModalButton).toBeInTheDocument();
    fireEvent.click(openModalButton)
    expect(index.queryByText('Move the modal by dragging the header.')).toBeInTheDocument();
  })
  it('closes the modal when the X button is clicked', () => {
    const openModalButton = index.getByRole('button', {name: 'Open Modal'})
    fireEvent.click(openModalButton)
    expect(index.queryByText('Move the modal by dragging the header.')).toBeInTheDocument();
    const closeModalButton = index.getByRole('button', {name: 'X'})
    fireEvent.click(closeModalButton)
    expect(index.queryByText('Move the modal by dragging the header.')).not.toBeInTheDocument();
  })
})