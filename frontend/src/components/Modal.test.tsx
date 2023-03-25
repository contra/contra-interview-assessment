import { render, screen, waitFor } from '@testing-library/react';
import user from '@testing-library/user-event';

import Modal from './Modal';

describe('<Modal />', () => {
  const contentChild = (
    <>
      <button data-testid="first-item" tabIndex={0} type="button">
        focusable Button
      </button>
      <button data-testid="second-item" tabIndex={0} type="button">
        focusable Button
      </button>
      <p>This is a test content</p>
    </>
  );
  let handleClose: () => void;

  beforeEach(() => {
    handleClose = jest.fn();
  });

  const renderComponent = () =>
    render(
      <Modal handleClose={handleClose} name="Confirm" isOpen>
        {contentChild}
      </Modal>
    );

  it('should render when prop isOpen = true', async () => {
    expect.hasAssertions();
    renderComponent();
    const modal = screen.queryByTestId('modal-container');
    expect(modal).toBeInTheDocument();
  });

  it('should call handleClose after click the close button', async () => {
    expect.hasAssertions();
    renderComponent();

    const closeButton = screen.getByTestId('modal-close-button');

    await user.click(closeButton);

    expect(handleClose).toHaveBeenCalledTimes(1);
  });

  it('should block the background scrolling', () => {
    jest.spyOn(window, 'scrollTo').mockImplementation();

    const initialScrollPosition = window.pageYOffset;

    renderComponent();

    window.scrollTo(0, 600);

    expect(window.pageYOffset).toBe(initialScrollPosition);
  });

  it('should focus on first element when render', async () => {
    renderComponent();

    const firstButton = screen.queryByTestId('first-item');

    await waitFor(() => expect(document.activeElement).toBe(firstButton));
  });

  it('should be able to change focus using Tab', async () => {
    renderComponent();

    const firstButton = screen.queryByTestId('first-item');
    const secondButton = screen.queryByTestId('second-item');

    firstButton?.focus();
    await user.tab();

    await waitFor(() => {
      expect(document.activeElement).toBe(secondButton);
    });
  });

  it('should close the modal when press Esc', async () => {
    renderComponent();

    await user.keyboard('{Escape}');

    expect(handleClose).toHaveBeenCalledTimes(1);
  });
});
