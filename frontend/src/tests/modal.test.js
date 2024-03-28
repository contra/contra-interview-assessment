import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import Modal from '../components/Modal';

describe('Modal component', () => {
  const handleClose = jest.fn();

  beforeEach(() => {
    handleClose.mockClear();
  });

  test('renders modal when isOpen is true', () => {
    render(
      <Modal isOpen={true} onClose={handleClose}>
        <h1>Modal Content</h1>
        <p>Some modal content</p>
      </Modal>
    );

    expect(screen.getByText('Modal Content')).toBeInTheDocument();
    expect(screen.getByText('Some modal content')).toBeInTheDocument();
  });

  test('does not render modal when isOpen is false', () => {
    render(
      <Modal isOpen={false} onClose={handleClose}>
        <h1>Modal Content</h1>
        <p>Some modal content</p>
      </Modal>
    );

    expect(screen.queryByText('Modal Content')).not.toBeInTheDocument();
    expect(screen.queryByText('Some modal content')).not.toBeInTheDocument();
  });

  test('calls onClose when the close button is clicked', () => {
    render(
      <Modal isOpen={true} onClose={handleClose}>
        <h1>Modal Content</h1>
        <p>Some modal content</p>
      </Modal>
    );

    const closeButton = screen.getByText('Close');
    fireEvent.click(closeButton);
    expect(handleClose).toHaveBeenCalledTimes(1);
  });

  test('calls onClose when the backdrop is clicked', () => {
    render(
      <Modal isOpen={true} onClose={handleClose}>
        <h1>Modal Content</h1>
        <p>Some modal content</p>
      </Modal>
    );

    const backdrop = screen.getByTestId('modal-backdrop');
    fireEvent.click(backdrop);
    expect(handleClose).toHaveBeenCalledTimes(1);
  });

  test('does not call onClose when the modal content is clicked', () => {
    render(
      <Modal isOpen={true} onClose={handleClose}>
        <h1>Modal Content</h1>
        <p>Some modal content</p>
      </Modal>
    );

    const modalContent = screen.getByTestId('modal-content');
    fireEvent.click(modalContent);
    expect(handleClose).not.toHaveBeenCalled();
  });
});
