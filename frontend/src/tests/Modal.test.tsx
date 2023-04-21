import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import Modal from '@/components/Modal';

describe('Modal', () => {
  it('should render the modal content', () => {
    const { getByText } = render(
      <Modal isOpen={true} onClose={jest.fn()}>
        <h1>Modal Content</h1>
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
      </Modal>
    );

    expect(getByText('Modal Content')).toBeInTheDocument();
    expect(getByText('Lorem ipsum dolor sit amet consectetur adipisicing elit.')).toBeInTheDocument();
  });

  it('should not render the modal when isOpen is false', () => {
    const { queryByText } = render(
      <Modal isOpen={false} onClose={jest.fn()}>
        <h1>Modal Content</h1>
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
      </Modal>
    );

    expect(queryByText('Modal Content')).toBeNull();
    expect(queryByText('Lorem ipsum dolor sit amet consectetur adipisicing elit.')).toBeNull();
  });

  it('should call onClose when clicking on the close button', () => {
    const onClose = jest.fn();
    const { getByText } = render(
      <Modal isOpen={true} onClose={onClose}>
        <h1>Modal Content</h1>
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
      </Modal>
    );

    fireEvent.click(getByText('Close'));
    expect(onClose).toHaveBeenCalledTimes(1);
  });
});
