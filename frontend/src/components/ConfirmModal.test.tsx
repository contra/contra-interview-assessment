import ConfirmationModal from './ConfirmModal';
import { render,screen } from '@testing-library/react';

describe('<ConfirmationModal />', () => {
  const handleClose = jest.fn();

  it('should render when prop isOpen = true', async () => {
    expect.hasAssertions();
    render(<ConfirmationModal handleClose={handleClose} isOpen />);
    const confirmButton = screen.queryByTestId('modal-confirm-button');

    expect(confirmButton).toBeInTheDocument();
  });
});
