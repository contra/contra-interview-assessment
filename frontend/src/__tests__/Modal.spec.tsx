import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import { Modal } from '@/components/Modal';

const renderModal = (open: boolean, onClose = () => {}) => {
  return render(
    <Modal data-testId="modal" onClose={onClose} open={open}>
      <input data-testid="input1" />
      <input data-testid="input2" />
      <button data-testid="button" type="button">
        Close
      </button>
    </Modal>
  );
};

describe('Modal', () => {
  it('focuses on the first element when opened', async () => {
    renderModal(true);
    const firstElement = screen.getByTestId('input1');
    await waitFor(() => expect(document.activeElement).not.toBe(document));

    expect(document.activeElement).toBe(firstElement);
  });

  it('focuses on the next element when tab is pressed', async () => {
    renderModal(true);
    const secondElement = screen.getByTestId('input2');

    await userEvent.keyboard('{Tab}');

    expect(document.activeElement).toBe(secondElement);
  });

  it('focuses on the first element when tab is pressed on the last element', async () => {
    renderModal(true);
    const firstElement = screen.getByTestId('input1');
    const lastElement = screen.getByTestId('button');

    lastElement.focus();
    await userEvent.keyboard('{Tab}');
    
    expect(document.activeElement).toBe(firstElement);
  })

  it('focuses on the last element when shift + tab is pressed on first element', async () => {
    renderModal(true);
    const firstElement = screen.getByTestId('input1');
    const lastElement = screen.getByTestId('button');

    firstElement.focus();
    await userEvent.keyboard('{Shift>}{Tab}');

    expect(document.activeElement).toBe(lastElement);
  });

  it('closes the modal when escape key is pressed', async () => {
    const handleClose = jest.fn();
    renderModal(true, handleClose);
    await userEvent.keyboard('{Escape}');

    expect(handleClose).toHaveBeenCalled();
  });
});
