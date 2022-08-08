import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Modal from './Modal';

describe(`Modals`, () => {
  it(`should show modal and lock scrolling`, () => {
    render(<Modal visible />);
    expect(screen.queryByRole(`dialog`)).toBeInTheDocument();
    expect(document.body).toHaveStyle({ overflowY: `hidden` });
  });

  it(`should call onOpened when opened`, async () => {
    expect.hasAssertions();
    const onOpened = jest.fn();
    render(<Modal animate={false} onOpened={onOpened} visible />);
    await waitFor(() => {
      expect(onOpened).toHaveBeenCalledTimes(1);
    });
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
    const mask = screen.getByTestId(`mask`);
    fireEvent.keyDown(mask, { key: `Escape` });
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

  it(`should only add modal to dom when visible`, () => {
    expect.hasAssertions();
    const { rerender } = render(<Modal visible={false} />);
    let modal = screen.queryByRole(`dialog`);
    expect(modal).not.toBeInTheDocument();
    rerender(<Modal visible />);
    modal = screen.getByRole(`dialog`);
    expect(modal).toBeInTheDocument();
  });

  it(`should destroy modal when closed`, async () => {
    expect.hasAssertions();
    render(<Modal destroyOnClose visible />);
    const modal = screen.queryByRole(`dialog`);
    const closeButton = screen.getByRole(`button`, { name: /close/i });
    fireEvent.click(closeButton);
    await waitFor(() => {
      expect(modal).not.toBeInTheDocument();
    });
  });

  it(`should keep focus in dialog when tabbing`, async () => {
    expect.hasAssertions();
    render(<Modal animate={false} visible />);
    const closeButton = screen.getByRole(`button`, { name: /close/i });
    await userEvent.keyboard(`{Tab}{Tab}{Tab}{Tab}{Tab}`);
    await waitFor(() => {
      expect(closeButton).toHaveFocus();
    });
  });

  it(`should keep focus in dialog when tabbing backwards`, async () => {
    expect.hasAssertions();
    render(<Modal animate={false} visible />);
    const closeButton = screen.getByRole(`button`, { name: /close/i });
    await userEvent.keyboard(`{Shift>}{Tab}{Tab}{Tab}{/Shift}`);
    await waitFor(() => {
      expect(closeButton).toHaveFocus();
    });
  });

  it(`should go to first element in modal when tabbed from the last input element`, async () => {
    expect.hasAssertions();
    render(<Modal animate={false} visible />);
    const okButton = screen.getByRole(`button`, { name: /ok/i });
    okButton.focus();
    await userEvent.keyboard(`{Tab}`);
    const closeButton = screen.getByRole(`button`, { name: /close/i });
    await waitFor(() => {
      expect(closeButton).toHaveFocus();
    });
  });

  it(`should go to last element in modal when back-tabbing from the first input element`, async () => {
    expect.hasAssertions();
    render(<Modal animate={false} visible />);
    const closeButton = screen.getByRole(`button`, { name: /close/i });
    closeButton.focus();
    await userEvent.keyboard(`{Shift>}{Tab}{/Shift}`);
    const okButton = screen.getByRole(`button`, { name: /ok/i });
    await waitFor(() => {
      expect(okButton).toHaveFocus();
    });
  });

  it(`should stack dialogs`, async () => {
    expect.hasAssertions();
    const { rerender } = render(
      <>
        <Modal animate={false} title="Modal 1" visible />
        <Modal animate={false} title="Modal 2" visible={false} />
      </>
    );
    const modal1 = screen.getByRole('dialog', { name: /modal 1/i })
      .parentElement?.parentElement;
    expect(modal1).toHaveStyle({ zIndex: 9_999 });
    expect(modal1).toHaveAttribute(`aria-level`, `1`);
    rerender(
      <>
        <Modal animate={false} title="Modal 1" visible />
        <Modal animate={false} title="Modal 2" visible />
      </>
    );
    const modal2 = screen.getByRole('dialog', { name: /modal 2/i })
      .parentElement?.parentElement;
    await waitFor(() => {
      expect(modal2).toHaveStyle({ zIndex: 10_000 });
      expect(modal2).toHaveAttribute(`aria-level`, `2`);
      expect(modal1).toHaveClass(`inactive`);
    });
    rerender(
      <>
        <Modal animate={false} title="Modal 1" visible />
        <Modal animate={false} title="Modal 2" visible={false} />
      </>
    );
    await waitFor(() => {
      expect(modal1).not.toHaveClass(`inactive`);
      expect(modal1).toHaveStyle({ zIndex: 9_999 });
    });
  });
});
