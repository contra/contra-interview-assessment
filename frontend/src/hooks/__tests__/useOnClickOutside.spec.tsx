import React, { useRef } from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import useOnClickOutside from '../useOnClickOutside';

describe('useOnClickOutside', () => {
  const callback = jest.fn();
  const TestComp = () => {
    const ref = useRef<HTMLDivElement>(null);
    useOnClickOutside(ref, callback);
    return (
      <div data-testid="outside" style={{ width: '200px', height: '200px' }}>
        <div ref={ref}>
          <div data-testid="inside" style={{ width: '20px', height: '20px' }}>
            <span>Inside it's safe</span>
            <button data-testid="inside-button">Dummy button</button>
          </div>
        </div>
        <button data-testid="outside-button">Outside button</button>
      </div>
    );
  };

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('callback triggered when clicking elements outside ', async () => {
    const user = userEvent.setup();
    render(<TestComp />);
    expect(callback).not.toHaveBeenCalled();

    // click on div
    const outsideComp = screen.getByTestId('outside');
    await user.click(outsideComp);
    expect(callback).toHaveBeenCalledTimes(1);

    // click on button
    const button = screen.getByTestId('outside-button');
    await user.click(button);
    expect(callback).toHaveBeenCalledTimes(2);
  });

  test('callback not triggered when clicking elements inside ', async () => {
    const user = userEvent.setup();
    render(<TestComp />);
    expect(callback).not.toHaveBeenCalled();

    // click on div
    const insideComp = screen.getByTestId('inside');
    await user.click(insideComp);
    expect(callback).not.toHaveBeenCalled();

    // click on text
    const text = screen.getByText(/Inside it's safe/);
    await user.click(text);
    expect(callback).not.toHaveBeenCalled();

    // click on button
    const button = screen.getByTestId('inside-button');
    await user.click(button);
    expect(callback).not.toHaveBeenCalled();
  });
});
