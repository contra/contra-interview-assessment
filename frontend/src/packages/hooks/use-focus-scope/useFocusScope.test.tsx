import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { type PropsWithChildren } from 'react';
import { useFocusScope } from '@/packages/hooks/use-focus-scope';

const FocusScopeTest = (props: PropsWithChildren) => {
  const { createFocusScope } = useFocusScope();

  return (
    <dialog open ref={createFocusScope}>
      {props.children}
    </dialog>
  );
};

describe('useFocusScope', () => {
  it('should contain focus within the scope', async () => {
    expect.hasAssertions();
    render(
      <FocusScopeTest>
        <input data-testid="input1" />
        <input data-testid="input2" />
        <input data-testid="input3" />
      </FocusScopeTest>
    );

    const input1 = screen.getByTestId('input1');
    const input2 = screen.getByTestId('input2');
    const input3 = screen.getByTestId('input3');

    await userEvent.tab();
    expect(document.activeElement).toBe(input1);

    await userEvent.tab();
    expect(document.activeElement).toBe(input2);

    await userEvent.tab();
    expect(document.activeElement).toBe(input3);

    await userEvent.tab();
    expect(document.activeElement).toBe(input1);

    await userEvent.tab({ shift: true });
    expect(document.activeElement).toBe(input3);

    await userEvent.tab({ shift: true });
    expect(document.activeElement).toBe(input2);

    await userEvent.tab({ shift: true });
    expect(document.activeElement).toBe(input1);
  });

  it('should work with nested elements', async () => {
    expect.hasAssertions();
    render(
      <FocusScopeTest>
        <input data-testid="input1" />
        <div>
          <input data-testid="input2" />
        </div>
      </FocusScopeTest>
    );

    const input1 = screen.getByTestId('input1');
    const input2 = screen.getByTestId('input2');

    await userEvent.tab();
    expect(document.activeElement).toBe(input1);

    await userEvent.tab();
    expect(document.activeElement).toBe(input2);

    await userEvent.tab();
    expect(document.activeElement).toBe(input1);

    await userEvent.tab({ shift: true });
    expect(document.activeElement).toBe(input2);

    await userEvent.tab({ shift: true });
    expect(document.activeElement).toBe(input1);
  });

  it('should skip non-tabbable elements', async () => {
    expect.hasAssertions();
    render(
      <FocusScopeTest>
        <input data-testid="input1" />
        <div />
        <input data-testid="input2" />
        <input hidden />
        <input tabIndex={-1} />
        <input disabled />
        <input data-testid="input3" />
      </FocusScopeTest>
    );

    const input1 = screen.getByTestId('input1');
    const input2 = screen.getByTestId('input2');
    const input3 = screen.getByTestId('input3');

    await userEvent.tab();
    expect(document.activeElement).toBe(input1);

    await userEvent.tab();
    expect(document.activeElement).toBe(input2);

    await userEvent.tab();
    expect(document.activeElement).toBe(input3);

    await userEvent.tab();
    expect(document.activeElement).toBe(input1);

    await userEvent.tab({ shift: true });
    expect(document.activeElement).toBe(input3);

    await userEvent.tab({ shift: true });
    expect(document.activeElement).toBe(input2);

    await userEvent.tab({ shift: true });
    expect(document.activeElement).toBe(input1);
  });

  it('should restore focus to the previously focused node on unmount', async () => {
    expect.hasAssertions();
    const { rerender } = render(
      <>
        <input autoFocus />
        <input data-testid="outsideInput" />
      </>
    );

    const outsideInput = screen.getByTestId('outsideInput');
    await userEvent.tab();
    expect(document.activeElement).toBe(outsideInput);

    rerender(
      <>
        <input />
        <input data-testid="outsideInput" />
        <FocusScopeTest>
          <input autoFocus data-testid="insideInput" />
        </FocusScopeTest>
      </>
    );
    const insideInput = screen.getByTestId('insideInput');
    expect(document.activeElement).toBe(insideInput);

    rerender(
      <>
        <input />
        <input data-testid="outsideInput" />
      </>
    );
    expect(document.activeElement).toBe(outsideInput);
  });
});
