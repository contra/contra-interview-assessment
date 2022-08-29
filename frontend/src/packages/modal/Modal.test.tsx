import { fireEvent, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Modal } from '@/packages/modal';

describe('Modal', () => {
  it('should render a dialog', () => {
    const modalContent = 'My modal content';

    render(
      <Modal onClose={() => {}}>
        <h2>{modalContent}</h2>
      </Modal>
    );

    expect(dialogSelector()).toBeInTheDocument();
    expect(screen.getByText(modalContent)).toBeInTheDocument();
  });

  it('should call onClose when backdrop clicked ', () => {
    const onCloseSpy = jest.fn();
    render(<Modal onClose={onCloseSpy}>My modal content</Modal>);

    expect(onCloseSpy).toHaveBeenCalledTimes(0);
    fireEvent.click(dialogSelector());
    expect(onCloseSpy).toHaveBeenCalledTimes(1);
  });

  it('should call onClose when native dialog is closed ', () => {
    const onCloseSpy = jest.fn();
    render(<Modal onClose={onCloseSpy}>My modal content</Modal>);

    expect(onCloseSpy).toHaveBeenCalledTimes(0);
    dialogSelector().dispatchEvent(new Event('close'));
    expect(onCloseSpy).toHaveBeenCalledTimes(1);
  });

  it('should lock background scroll', () => {
    render(<Modal onClose={() => {}}>My modal content</Modal>);
    expect(document.documentElement).toHaveStyle('overflow: hidden');
  });

  it('should trap focus inside modal', async () => {
    expect.hasAssertions();
    render(
      <>
        <input />
        <Modal onClose={() => {}}>
          <input autoFocus data-testid="insideInput1" />
          <input data-testid="insideInput2" />
        </Modal>
      </>
    );

    const insideInput1 = screen.getByTestId('insideInput1');
    const insideInput2 = screen.getByTestId('insideInput2');

    expect(document.activeElement).toBe(insideInput1);
    await userEvent.tab();
    expect(document.activeElement).toBe(insideInput2);
    await userEvent.tab();
    expect(document.activeElement).toBe(insideInput1);
  });
});

/**
 * JSDOM is not implementing the HTMLDialogElement interface yet.
 * Hidden true is needed because dialog.showModal is mocked in the test environment.
 */
function dialogSelector() {
  return screen.getByRole<HTMLDialogElement>('dialog', { hidden: true });
}
