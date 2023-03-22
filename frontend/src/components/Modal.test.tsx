import Modal from './Modal';
import { fireEvent, render, screen } from '@testing-library/react';

describe('<Modal />', () => {
  const contentChild = <p>This is a test content</p>;
  const handleClose = jest.fn();

  it('should render when prop isOpen = true', async () => {
    expect.hasAssertions();
    render(<Modal child={contentChild} handleClose={handleClose} isOpen />);
    const modal = screen.queryByTestId('modal-container');
    expect(modal).toBeInTheDocument();
  });

  it('should call handleClose after click the close button', async () => {
    expect.hasAssertions();
    const { getByTestId } = render(
      <Modal child={contentChild} handleClose={handleClose} isOpen />
    );

    const closeButton = getByTestId('modal-close');

    fireEvent.click(closeButton);

    expect(handleClose).toHaveBeenCalledTimes(1);
  });

  it.todo('should block the background scrolling');
  it.todo('should block the background clicking actions');
  it.todo('should have aria attribute for screen readers');
  it.todo('should have color contracts');
});
