import React from 'react';
import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import useOnEscKeypress from '../useOnEscKeypress';

describe('useOnEscKeypress', () => {
  const callback = jest.fn();
  const TestComp = () => {
    useOnEscKeypress(callback);
    return <div>hello</div>;
  };

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('callback called on escape key press', async () => {
    const user = userEvent.setup();
    render(<TestComp />);
    expect(callback).not.toHaveBeenCalled();
    await user.keyboard('{Escape}');
    expect(callback).toHaveBeenCalledTimes(1);
  });
});
