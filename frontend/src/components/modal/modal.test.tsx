import { cleanup, fireEvent, render, screen } from '@testing-library/react';
import Modal from '.';

describe('<Modal/>', () => {
  beforeEach(() => {
    cleanup();
    // Mock the container
    render(<div data-testid="modal-container" id="modal" />);
  })

  it('should not render modal content if "open" prop is false', () => {
    const content = "Modal Content"

    render(<Modal> {content} </Modal>)

    expect(screen.queryByText(content)).not.toBeInTheDocument();
  })

  it('should render modal content when "open" prop is true', () => {
    const content = "Modal Content"

    render(<Modal open> {content} </Modal>)

    expect(screen.queryByText(content)).toBeInTheDocument();
  })
  
  it('should set dialog properties through props', () => {
    const testId = "modal-dialog"
    const classname = "dialog-class"

    render(<Modal className={classname} data-testid={testId} open> </Modal>)

    expect(screen.getByTestId(testId).tagName).toBe("dialog");
    expect(screen.getByTestId(testId).className).toBe(classname);
  })
  // should handle on click outside

  it('should handle on click outside', () => {
    const testId = "modal-dialog"
    const content = "Modal Content"
    const onClickOutside = jest.fn();

    render(<Modal  data-testid={testId} onClickOutside={onClickOutside} open> {content} </Modal>)

    fireEvent.click(screen.getByTestId(testId));
    expect(onClickOutside).toHaveBeenCalledTimes(1);

    fireEvent.click(screen.getByText(content));
    expect(onClickOutside).toHaveBeenCalledTimes(1);
  })
});