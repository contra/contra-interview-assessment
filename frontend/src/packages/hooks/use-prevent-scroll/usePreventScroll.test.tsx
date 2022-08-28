import { render } from '@testing-library/react';
import { type PropsWithChildren } from 'react';
import { usePreventScroll } from '@/packages/hooks/use-prevent-scroll/usePreventScroll';

const PreventScrollTest = (props: PropsWithChildren) => {
  usePreventScroll();
  return <>{props.children}</>;
};

describe('usePreventScroll', () => {
  it('should prevent scrolling on the document root', () => {
    const overflowStyles = {
      overflow: 'hidden',
      paddingRight: `${
        window.innerWidth - document.documentElement.clientWidth
      }px`,
    };
    const { rerender } = render(
      <>
        <h2>Other element</h2>
        <PreventScrollTest>NoScroll</PreventScrollTest>
      </>
    );

    expect(document.documentElement).toHaveStyle(overflowStyles);
    rerender(<h2>Other element</h2>);
    expect(document.documentElement).not.toHaveStyle(overflowStyles);
  });
});
