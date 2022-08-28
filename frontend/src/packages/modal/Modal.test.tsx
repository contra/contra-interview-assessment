import { Button } from '@/packages/button';
import { Modal } from '@/packages/modal';
import { fireEvent, render, screen } from '@testing-library/react';

describe('Modal', () => {
  it('should render a dialog', async () => {
    const modalContent = 'My modal content';
    const showModalSpy = jest.spyOn(HTMLDialogElement.prototype, 'showModal');

    render(
      <Modal onBackdropClick={() => {}}>
        <h2>{modalContent}</h2>
      </Modal>
    );

    expect(dialogSelector()).toBeInTheDocument();
    expect(screen.getByText(modalContent)).toBeInTheDocument();
    expect(showModalSpy).toHaveBeenCalled();
  });

  it('should call on backdrop click callback', async () => {
    const onBackdropClickSpy = jest.fn();
    render(
      <Modal onBackdropClick={onBackdropClickSpy}>
        <Button onClick={() => {}}>Wow</Button>
      </Modal>
    );

    expect(onBackdropClickSpy).toHaveBeenCalledTimes(0);
    fireEvent.click(dialogSelector());
    expect(onBackdropClickSpy).toHaveBeenCalledTimes(1);
  });
});

/**
 * JSDOM is not implementing the HTMLDialogElement interface yet.
 * Hidden true is needed because dialog.showModal is mocked in the test environment.
 */
const dialogSelector = () => screen.getByRole('dialog', { hidden: true });
