import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Modal from '../Modal';

describe(`Modal Component Test`, () => {

  it(`should show base modal`, () => {
    render(<Modal handleClose={() => { }} isOpen />);
    expect(screen.queryByTestId(`modal`)).toBeInTheDocument();
  });

  it(`should close modal`, async () => {
    expect.hasAssertions();
    const handleClose = jest.fn();
    render(<Modal handleClose={handleClose} isOpen />);
    const closeButton = screen.queryByTestId('close-button');
    await userEvent.click(closeButton as Element);
    await waitFor(() => {
      expect(handleClose).toHaveBeenCalledTimes(1);
    });
  });

  it(`should set title properly`, () => {
    const title = "sample title";
    render(<Modal handleClose={() => { }} isOpen title={title} />);
    expect(screen.queryByTestId(`header-title`)?.textContent).toBe(title);
  });

  it(`should close modal on Esc keypress`, async () => {
    expect.hasAssertions();
    const handleClose = jest.fn();
    render(<Modal handleClose={handleClose} isOpen keyboardEscapable />);
    const overlay = screen.getByTestId(`overlay`);
    fireEvent.keyDown(overlay, { key: `Escape` });
    await waitFor(() => {
      expect(handleClose).toHaveBeenCalledTimes(1);
    });
  });

  it(`should close modal on backdrop click`, async () => {
    expect.hasAssertions();
    const handleClose = jest.fn();
    render(<Modal backdropClosable handleClose={handleClose} isOpen />);
    const overlay = screen.getByTestId(`overlay`);
    fireEvent.click(overlay);
    await waitFor(() => {
      expect(handleClose).toHaveBeenCalledTimes(1);
    });
  });
});