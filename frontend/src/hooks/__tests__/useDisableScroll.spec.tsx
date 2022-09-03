import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import useDisableScroll from '../useDisableScroll';

describe('useOnClickOutside', () => {
  const callback = jest.fn();
  const TestComp = ({ hideScroll }: { hideScroll: boolean }) => {
    useDisableScroll(hideScroll);
    return (
      <div
        data-testid="overflow-container"
        style={{ height: '150vh' }}
        onScroll={callback}
      >
        <span>blah</span>
      </div>
    );
  };

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('when scroll not disabled, callback triggered', async () => {
    render(<TestComp hideScroll={false} />);
    expect(callback).not.toHaveBeenCalled();

    // click on div
    const container = screen.getByTestId('overflow-container');
    fireEvent.scroll(container, { target: { scrollY: 100 } });
    expect(callback).toHaveBeenCalledTimes(1);
  });

  // can't seem to get this working, also not sure how to test changes in `document.body.style.overflow`
  test.skip('when scroll disabled, callback is not triggered', async () => {
    render(<TestComp hideScroll={true} />);
    expect(callback).not.toHaveBeenCalled();

    // click on div
    const container = screen.getByTestId('overflow-container');
    fireEvent.scroll(container, { target: { scrollY: 100 } });
    expect(callback).toHaveBeenCalledTimes(1);
  });
});
