/* eslint-disable canonical/filename-match-exported, import/no-unassigned-import */
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import Index from '..';

describe('<Index />', () => {
  it('renders the welcome message and open modal button', () => {
    expect.assertions(2);
    render(<Index />);
    expect(screen.getByText(/welcome to contra!/i)).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: /open modal/i })
    ).toBeInTheDocument();
  });

  it('opens and closes the modal', async () => {
    expect.assertions(3);
    render(<Index />);

    const openModalButton = screen.getByRole('button', { name: /open modal/i });
    await userEvent.click(openModalButton);

    expect(screen.getByRole('dialog')).toBeInTheDocument();
    expect(screen.getByText(/modal content/i)).toBeInTheDocument();

    const closeModalButton = screen.getByRole('button', {
      name: /close modal/i,
    });
    await userEvent.click(closeModalButton);

    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
  });
});
