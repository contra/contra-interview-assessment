import ConfirmationModal from './ConfirmModal';
import { render } from '@testing-library/react';

describe('<ConfirmationModal />', () => {
  const handleClose = jest.fn();

  it('should render when prop isOpen = true', async () => {
    expect.hasAssertions();
    const { getByRole } = render(
      <ConfirmationModal handleClose={handleClose} isOpen />
    );
    const confirmButton = getByRole('button', { name: 'Confirm' });

    expect(confirmButton).toBeInTheDocument();
  });
});
