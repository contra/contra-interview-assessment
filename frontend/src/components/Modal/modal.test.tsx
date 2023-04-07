import { render, fireEvent } from '@testing-library/react';
import { ThemeProvider } from 'styled-components';
import { lightTheme } from '../../styled/themes';
import Modal from '.';

describe('Modal component', () => {
  it('renders the modal content', () => {
    const { getByText } = render(
      <ThemeProvider theme={lightTheme}>
        <Modal isOpen onClose={() => {}}>
          <p>Hello, world!</p>
        </Modal>
      </ThemeProvider>
    );

    expect(getByText('Hello, world!')).toBeInTheDocument();
  });

  it('calls the onClose callback when clicking the close button', () => {
    const onClose = jest.fn();
    const { getByText } = render(
      <ThemeProvider theme={lightTheme}>
        <Modal isOpen onClose={onClose}>
          <p>Hello, world!</p>
        </Modal>
      </ThemeProvider>
    );

    fireEvent.click(getByText('×'));
    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it('calls the onClose callback when pressing the Escape key', () => {
    const onClose = jest.fn();
    const { getByTestId } = render(
      <ThemeProvider theme={lightTheme}>
        <div data-testid="outside">
          <Modal isOpen onClose={onClose}>
            <p>Hello, world!</p>
          </Modal>
        </div>
      </ThemeProvider>
    );

    fireEvent.keyDown(getByTestId('outside'), {
      code: 'Escape',
      key: 'Escape',
    });
    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it('renders the nested modal content', () => {
    const { getByText } = render(
      <ThemeProvider theme={lightTheme}>
        <Modal isOpen onClose={() => {}}>
          <Modal isOpen onClose={() => {}}>
            <p>Hello, nested world!</p>
          </Modal>
        </Modal>
      </ThemeProvider>
    );

    expect(getByText('Hello, nested world!')).toBeInTheDocument();
  });
});
