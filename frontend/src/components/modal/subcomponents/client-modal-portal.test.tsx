import { cleanup, render, screen } from '@testing-library/react';
import ClientModalPortal from './ClientModalPortal';

describe('<ClientModalPortal>', () => {

  beforeEach(() => {
    cleanup();
    // Mock the container
    render(<div data-testid="modal-container" id="modal" />);
  })

  it('should not render any children in modal container if no children are passed', () => {
    expect(screen.queryByTestId("modal-container")?.children).toHaveLength(0);
  });

  it('should render children in modal container', () => {
    // Arrange
    const content = 'Content';

    // Act
    render(
      <ClientModalPortal><p>{content}</p></ClientModalPortal>
    );

    // Assert
    expect(screen.getByText(content).parentElement?.id).toBe('modal');
  });

  it('should render multiple children in the same modal container', () => {
    // Arrange
    const content1 = 'Content1';
    const content2 = 'Content2';
    const content3 = 'Content3';

    // Act
    render(
      <ClientModalPortal><p>{content1}</p></ClientModalPortal>
    );
    render(
      <ClientModalPortal><p>{content3}</p></ClientModalPortal>
    );
    render(
      <ClientModalPortal><p>{content2}</p></ClientModalPortal>
    );

    // Assert
    expect(screen.getByText(content1).nextSibling?.textContent).toBe(content3);
    expect(screen.getByText(content3).nextSibling?.textContent).toBe(content2);
  });
});
