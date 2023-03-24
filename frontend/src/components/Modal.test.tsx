import { fireEvent, render, screen } from '@testing-library/react';

import Modal from './Modal';

describe('<Modal />', () => {
  const contentChild = <p>This is a test content</p>;
  const handleClose = jest.fn();

  it('should render when prop isOpen = true', async () => {
    expect.hasAssertions();
    render(
      <Modal handleClose={handleClose} isOpen>
        {contentChild}
      </Modal>
    );
    const modal = screen.queryByTestId('modal-container');
    expect(modal).toBeInTheDocument();
  });

  it('should call handleClose after click the close button', async () => {
    expect.hasAssertions();
    const { getByTestId } = render(
      <Modal handleClose={handleClose} isOpen>
        {contentChild}
      </Modal>
    );

    const closeButton = getByTestId('modal-close');

    fireEvent.click(closeButton);

    expect(handleClose).toHaveBeenCalledTimes(1);
  });

  it('should block the background scrolling', () => {
    const initialScrollPosition = window.pageYOffset;

    render(
      <Modal handleClose={handleClose} isOpen>
        {contentChild}
      </Modal>
    );

    window.scrollTo(0, 600);

    expect(window.pageYOffset).toBe(initialScrollPosition);
  });

  it.todo('should focus on first element when render');
  it.todo('should be able to change focus using Tab');
  it.todo('should close the modal when press Esc');
});
