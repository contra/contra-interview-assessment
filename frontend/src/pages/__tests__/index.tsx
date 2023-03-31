import {render, screen, waitFor} from '@testing-library/react';
import '@testing-library/jest-dom';
import Index from "../index";
import userEvent from '@testing-library/user-event'

describe('Index Page with Modals', () => {

  it('show modal is clicked, only one modal should be visible', async () => {
    render(<Index/>);

    await userEvent.click(screen.getByText('Start'));

    await waitFor(()=>{
      expect(screen.getByRole('heading', {name: 'Developer Quiz'})).toBeInTheDocument();
      expect(screen.queryAllByRole('heading', {name: 'Why do we care?'}).length).toEqual(0);
    });
  });

  it('show second modal on top of first', async () => {
    render(<Index/>);

    await userEvent.click(screen.getByText('Start'));

    await waitFor(async () => {
      expect(screen.getByRole('heading', {name: 'Developer Quiz'})).toBeInTheDocument();
      expect(screen.queryAllByRole('heading', {name: 'Why do we care?'}).length).toEqual(0);
      expect(screen.getByRole('button', {name: 'Done'})).toBeInTheDocument();
      await userEvent.click(screen.getByRole('button', {name: 'Done'}))
    });
  });
});
