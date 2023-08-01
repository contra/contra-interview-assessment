import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { useState } from 'react';
import { Modal } from '.';

describe('Modal component', () => {
  const ToggleableModal = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    return (
      <div>
        <button onClick={() => setIsModalOpen(true)} type="button">
          Toggle modal
        </button>
        <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
          Modal content
        </Modal>
      </div>
    );
  };

  it('can be visible by default', () => {
    render(
      <Modal isOpen onClose={() => {}}>
        Modal content
      </Modal>
    );

    expect(screen.getByText('Modal content')).toBeInTheDocument();
  });

  it('is toggleable', async () => {
    expect.assertions(2);

    render(<ToggleableModal />);

    expect(screen.queryByText('Modal content')).not.toBeInTheDocument();

    await userEvent.click(screen.getByText('Toggle modal'));

    expect(screen.getByText('Modal content')).toBeInTheDocument();
  });

  it('is tabbable only within itself', async () => {
    expect.assertions(4);

    const TabbableModal = () => {
      return (
        <div>
          <button type="button">Button outside modal</button>
          <Modal isOpen onClose={() => {}}>
            <button type="button">Button 1</button>
            <button type="button">Button 2</button>
            <button type="button">Button 3</button>
          </Modal>
        </div>
      );
    };

    render(<TabbableModal />);

    await userEvent.tab();

    expect(document.activeElement).toHaveTextContent('Button 1');

    await userEvent.tab();

    expect(document.activeElement).toHaveTextContent('Button 2');

    await userEvent.tab();

    expect(document.activeElement).toHaveTextContent('Button 3');

    await userEvent.tab();

    expect(document.activeElement).toHaveTextContent('Button 1');
  });

  it('closes on clicking outside the modal', async () => {
    expect.assertions(3);

    render(<ToggleableModal />);

    expect(screen.queryByText('Modal content')).not.toBeInTheDocument();

    await userEvent.click(screen.getByText('Toggle modal'));

    expect(screen.getByText('Modal content')).toBeInTheDocument();

    await userEvent.click(document.body);

    expect(screen.getByText('Modal content')).toBeInTheDocument();
  });
});
