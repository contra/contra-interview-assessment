import { render, screen } from '@testing-library/react';
import { type PropsWithChildren } from 'react';
import { Portal } from './Portal';

const PortalTest = (props: PropsWithChildren<{ isVisible: boolean }>) => {
  return props.isVisible ? <Portal>{props.children}</Portal> : null;
};

describe('Portal', () => {
  it('renders children in new body node', () => {
    const portalContent = 'Hello world';
    const { baseElement: body, rerender } = render(
      <PortalTest isVisible>{portalContent}</PortalTest>
    );

    expect(body.children).toHaveLength(2);
    expect(screen.getByText(portalContent).parentElement?.tagName).toBe('BODY');

    rerender(<PortalTest isVisible={false}>{portalContent}</PortalTest>);
    expect(body.children).toHaveLength(1);
    expect(screen.queryByText(portalContent)).not.toBeInTheDocument();
  });

  it('can render multiple portals', () => {
    const firstPortalContent = 'Hello world';
    const secondPortalContent = 'Hello world two';

    const { baseElement: body, rerender } = render(
      <>
        <PortalTest isVisible>{firstPortalContent}</PortalTest>
        <PortalTest isVisible={false}>{secondPortalContent}</PortalTest>
      </>
    );

    expect(body.children).toHaveLength(2);
    expect(screen.getByText(firstPortalContent)).toBeInTheDocument();

    rerender(
      <>
        <PortalTest isVisible>{firstPortalContent}</PortalTest>
        <PortalTest isVisible>{secondPortalContent}</PortalTest>
      </>
    );

    expect(body.children).toHaveLength(3);
    expect(screen.getByText(firstPortalContent)).toBeInTheDocument();
    expect(screen.getByText(secondPortalContent)).toBeInTheDocument();
  });
});
