import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Modal from './Modal';

describe(`Modals`, () => {
  it(`Should load component`, () => {
    render(<Modal visible />);
    expect(screen.queryByRole(`dialog`)).toBeInTheDocument();
  });

  it(`should close dialog`, async () => {
    expect.hasAssertions();
    const onCancel = jest.fn();
    render(<Modal animate={false} onCancel={onCancel} visible />);
    const closeButton = screen.getByRole(`button`, { name: /close/i });
    await userEvent.click(closeButton);
    await waitFor(() => {
      expect(onCancel).toHaveBeenCalledTimes(1);
    });
  });

  it(`should close dialog when visible is false`, async () => {
    expect.hasAssertions();
    const onCancel = jest.fn();
    const { rerender } = render(
      <Modal animate={false} onCancel={onCancel} visible />
    );
    rerender(<Modal animate={false} onCancel={onCancel} visible={false} />);
    await waitFor(() => {
      expect(onCancel).toHaveBeenCalledTimes(1);
    });
  });

  it(`should close modal by tapping escape`, async () => {
    expect.hasAssertions();
    render(<Modal visible />);
    await userEvent.keyboard(`{Escape}`);
    const mask = screen.getByTestId(`mask`);
    fireEvent.click(mask);
    await waitFor(() => {
      expect(mask).toHaveStyle({ opacity: 0 });
    });
  });

  it(`should close modal by clicking on mask`, async () => {
    expect.hasAssertions();
    render(<Modal visible />);
    const mask = screen.getByTestId(`mask`);
    fireEvent.click(mask);
    await waitFor(() => {
      expect(mask).toHaveStyle({ opacity: 0 });
    });
  });

  it(`should destroy modal when closed`, async () => {
    expect.hasAssertions();
    render(<Modal destroyOnClose visible />);
    const mask = screen.getByTestId(`mask`);
    fireEvent.click(mask);
    await waitFor(() => {
      expect(mask).not.toBeInTheDocument();
    });
  });

  it(`should keep focus in dialog`, async () => {
    expect.hasAssertions();
    render(<Modal animate={false} visible />);
    const closeButton = screen.getByRole(`button`, { name: /close/i });
    await userEvent.keyboard(`{Tab}{Tab}{Tab}{Tab}{Tab}`);
    await waitFor(() => {
      expect(closeButton).toHaveFocus();
    });
  });
});
