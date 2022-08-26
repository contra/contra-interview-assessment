import {
  act,
  fireEvent,
  queryByLabelText,
  queryByRole,
  render,
  screen,
  waitFor,
  waitForElementToBeRemoved,
} from '@testing-library/react';
import '@testing-library/jest-dom';
import userEvent from '@testing-library/user-event';
import Index from '../pages/index';

describe('Modal Index', () => {
  it('renders', () => {
    render(<Index />);

    const inputInModal = screen.queryByLabelText(/name/i);

    expect(inputInModal).toBeNull();
    expect(screen.getByText(/Welcome to Contra/i)).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: /open modal/i })
    ).toBeInTheDocument();
  });

  it('modal opens', async () => {
    render(<Index />);

    screen.getByRole('button', { name: /open modal/i }).click();

    const inputInModal = await screen.findByLabelText(/name/i);

    expect(inputInModal).toBeInTheDocument();
    expect(inputInModal).toHaveFocus();
  });

  it('modal has trap focus', async () => {
    render(<Index />);

    userEvent.click(screen.getByRole('button', { name: /open modal/i }));

    const nameInput = await screen.findByRole('textbox', { name: /name/i });
    const emailInput = await screen.findByRole('textbox', { name: /email/i });
    const submitBtn = await screen.findByRole('button', { name: /submit/i });
    const cancelBtn = await screen.findByRole('button', { name: /cancel/i });

    expect(nameInput).toHaveFocus();

    await userEvent.tab();

    expect(emailInput).toHaveFocus();

    await userEvent.tab();

    expect(submitBtn).toHaveFocus();

    await userEvent.tab();

    expect(cancelBtn).toHaveFocus();

    await userEvent.tab();

    waitFor(() => expect(nameInput).toHaveFocus());
  });

  it('modal closes', async () => {
    render(<Index />);

    userEvent.click(screen.getByRole('button', { name: /open modal/i }));

    const nameInput = await screen.findByRole('textbox', { name: /name/i });

    expect(nameInput).toBeInTheDocument();

    userEvent.click(screen.getByRole('button', { name: /cancel/i }));

    await waitForElementToBeRemoved(
      screen.queryByRole('textbox', { name: /name/i })
    );
  });

  it('modal closes on Esc', async () => {
    render(<Index />);

    userEvent.click(screen.getByRole('button', { name: /open modal/i }));

    const nameInput = await screen.findByRole('textbox', { name: /name/i });

    expect(nameInput).toBeInTheDocument();

    userEvent.type(nameInput, '{Escape}');

    await waitForElementToBeRemoved(
      screen.queryByRole('textbox', { name: /name/i })
    );
  });

  it('modal closes on outside click', async () => {
    render(<Index />);

    userEvent.click(screen.getByRole('button', { name: /open modal/i }));

    const nameInput = await screen.findByRole('textbox', { name: /name/i });

    expect(nameInput).toBeInTheDocument();

    userEvent.click(screen.getByTestId(/modal-/i));

    await waitForElementToBeRemoved(
      screen.queryByRole('textbox', { name: /name/i })
    );
  });
});
