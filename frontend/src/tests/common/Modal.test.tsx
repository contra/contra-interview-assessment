import { fireEvent } from '@testing-library/react';

import '@testing-library/jest-dom/extend-expect';
import '@testing-library/jest-dom';

import { Modal } from '../../common/Modal';
import { render } from '../testUtils';

// In your test file
jest.mock('focus-trap-react', () => ({
  __esModule: true,
  default: function FocusTrap({ children }: { children: React.ReactNode }) {
    return <>{children}</>;
  },
}));

describe('Modal', () => {
  it('should render a closed modal by default', () => {
    const { queryByRole } = render(<Modal header="Test Header" />);
    const modalDialog = queryByRole('dialog');
    expect(modalDialog).toBeNull();
  });

  it('should render an open modal with a header', () => {
    const { getByRole, getByText } = render(
      <Modal header="Test Header" isOpen={true} />
    );
    const modalDialog = getByRole('dialog');
    expect(modalDialog).toBeInTheDocument();
    expect(getByText('Test Header')).toBeInTheDocument();
  });

  it('should call the onClose function when the close icon is clicked', () => {
    const onClose = jest.fn();
    const { getByLabelText } = render(
      <Modal header="Test Header" isOpen={true} onClose={onClose} />
    );
    const closeButton = getByLabelText('Close Modal');
    fireEvent.click(closeButton);
    expect(onClose).toHaveBeenCalled();
  });
});
