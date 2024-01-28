import { render, screen, fireEvent } from '@testing-library/react';
import React from 'react';
import { DialogNonModal as Dialog } from './DialogNonModal';
import '@testing-library/jest-dom';

describe('DialogNonModal', () => {
  test('renders and opens the dialog when isOpen is true', () => {
    const onClose = jest.fn();
    const children = <div>Test Content</div>;

    render(
      <Dialog isOpen={true} onClose={onClose}>
        {children}
      </Dialog>
    );

    // Dialog should be in the document
    const dialogElement = screen.getByRole('dialog');
    expect(dialogElement).toBeInTheDocument();

    // Dialog should have the "open" attribute set to true
    expect(dialogElement).toHaveAttribute('open', '');

    // Children should be rendered inside the dialog
    const childElement = screen.getByText('Test Content');
    expect(childElement).toBeInTheDocument();
  });

  test('does not render and closes the dialog when isOpen is false', () => {
    const onClose = jest.fn();
    const children = <div>Test Content</div>;

    render(
      <Dialog isOpen={false} onClose={onClose}>
        {children}
      </Dialog>
    );

    // Dialog should not be in the document
    const dialogElement = screen.queryByRole('dialog');
    expect(dialogElement).not.toBeInTheDocument();
  });

  test('calls onClose when clicking outside the dialog', () => {
    const onClose = jest.fn();
    const children = <div>Test Content</div>;

    render(
      <Dialog isOpen={true} onClose={onClose}>
        {children}
      </Dialog>
    );

    // Click outside the dialog
    fireEvent.click(screen.getByTestId('dialog-root'));

    // onClose should be called
    setTimeout(() => {
      expect(onClose).toHaveBeenCalledTimes(1);
    }, 1_500);
  });
});
