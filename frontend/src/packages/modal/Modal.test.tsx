import { fireEvent, render, screen } from '@testing-library/react';
import { Modal } from '@/packages/modal';

describe('Modal', () => {
  it('should render a dialog', () => {
    const modalContent = 'My modal content';
    const showModalSpy = jest.spyOn(HTMLDialogElement.prototype, 'showModal');

    render(
      <Modal onBackdropClick={() => {}}>
        <h2>{modalContent}</h2>
      </Modal>
    );

    expect(dialogSelector()).toBeInTheDocument();
    expect(screen.getByText(modalContent)).toBeInTheDocument();
    expect(showModalSpy).toHaveBeenCalledWith(undefined);
  });

  it('should call on backdrop click callback', () => {
    const onBackdropClickSpy = jest.fn();
    render(
      <Modal onBackdropClick={onBackdropClickSpy}>My modal content</Modal>
    );

    expect(onBackdropClickSpy).toHaveBeenCalledTimes(0);
    fireEvent.click(dialogSelector());
    expect(onBackdropClickSpy).toHaveBeenCalledTimes(1);
  });

  it('should lock background scroll', () => {
    render(<Modal onBackdropClick={() => {}}>My modal content</Modal>);
    expect(document.documentElement).toHaveStyle('overflow: hidden');
  });
});

/**
 * JSDOM is not implementing the HTMLDialogElement interface yet.
 * Hidden true is needed because dialog.showModal is mocked in the test environment.
 */
function dialogSelector() {
  return screen.getByRole('dialog', { hidden: true });
}
