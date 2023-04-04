import React from 'react';
import { render } from '@testing-library/react';
import Modal from './Modal';
import 'jest-styled-components';

describe('Modal component', () => {
  test('should render with isOpen=false', () => {
    const { container } = render(
      <Modal isOpen={false} onClose={() => null}>
        TESTING{' '}
      </Modal>
    );
    expect(container.firstChild).toBeNull();
  });

  // test('should render with isOpen=true', () => {
  //   const { container } = render(<Modal isOpen={true}>Content</Modal>);
  //   expect(container.firstChild).toMatchSnapshot();
  // });
  //
  // test('should call onClose when close button is clicked', () => {
  //   const handleClose = jest.fn();
  //   render(
  //     <Modal isOpen={true} onClose={handleClose}>
  //       Content
  //     </Modal>
  //   );
  //   const closeButton = screen.getByLabelText('close');
  //   fireEvent.click(closeButton);
  //   expect(handleClose).toHaveBeenCalledTimes(1);
  // });
  //
  // test('should render children', () => {
  //   const { container } = render(<Modal isOpen={true}>Content</Modal>);
  //   expect(container).toHaveTextContent('Content');
  // });
  //
  // test('should set size prop', () => {
  //   const { container } = render(
  //     <Modal isOpen={true} size="sm">
  //       Content
  //     </Modal>
  //   );
  //   expect(container.firstChild).toHaveStyle('width: 20%;');
  // });
  //
  // test('should not close on overlay click if closeOnOverlayClick is false', () => {
  //   const handleClose = jest.fn();
  //   render(
  //     <Modal isOpen={true} onClose={handleClose} closeOnOverlayClick={false}>
  //       Content
  //     </Modal>
  //   );
  //   const overlay = screen.getByTestId('modal-overlay');
  //   fireEvent.click(overlay);
  //   expect(handleClose).toHaveBeenCalledTimes(0);
  // });
});
