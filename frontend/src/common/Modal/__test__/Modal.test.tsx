import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render, fireEvent } from '@testing-library/react';

import Modal from '..';

describe('Modal', () => {
  it('should render modal without crashing', () => {
    const { getByTestId } = render(
    <Modal isOpen onClose={() => {}}>
      <Modal.Header>
        <h1>Modal Header</h1>
      </Modal.Header>
    </Modal>
    );
    expect(getByTestId("modal-dialog")).toBeInTheDocument();
  }),

  it('should not render the modal if isOpen is false', () => {
    const { queryByTestId } = render(
    <Modal isOpen={false} onClose={() => {}}>
      <Modal.Header>
        <h1>Modal Header</h1>
      </Modal.Header>
    </Modal>
    );
    expect(queryByTestId("modal-dialog")).not.toBeInTheDocument();
  }),

  it('should render backdrop', () => {
    const { getByTestId } = render(
    <Modal isOpen onClose={() => {}}>
      <Modal.Header>
        <h1>Modal Header</h1>
      </Modal.Header>
    </Modal>
    );
    expect(getByTestId("modal-backdrop")).toBeInTheDocument();
  }),

  it('should render the modal header', () => {
    const { getByTestId } = render(
    <Modal isOpen onClose={() => {}}>
      <Modal.Header>
        <h1>Modal Header</h1>
      </Modal.Header>
    </Modal>
    );
    expect(getByTestId("modal-header")).toBeInTheDocument();
  }),

  it('should render the modal body', () => {
    const { getByTestId } = render(
    <Modal isOpen onClose={() => {}}>
      <Modal.Header>
        <h1>Modal Header</h1>
      </Modal.Header>
      <Modal.Body>
        <h1>Modal Body</h1>
      </Modal.Body>
    </Modal>
    );
    expect(getByTestId("modal-body")).toBeInTheDocument();
  }),

  it('should render the modal footer', () => {
    const { getByTestId } = render(
      <Modal isOpen onClose={() => {}}>
        <Modal.Header>
          <h1>Modal Header</h1>
        </Modal.Header>
        <Modal.Body>
          <h1>Modal Body</h1>
        </Modal.Body>
        <Modal.Footer>
          <h1>Modal Footer</h1>
        </Modal.Footer>
    </Modal>
    );
    expect(getByTestId("modal-footer")).toBeInTheDocument();
  }),

  it('should render the modal close button', () => {
    const { getByTestId } = render(
      <Modal isOpen onClose={() => {}}>
        <Modal.Header>
          <h1>Modal Header</h1>
        </Modal.Header>
        <Modal.Body>
          <h1>Modal Body</h1>
        </Modal.Body>
        <Modal.Footer>
          <h1>Modal Footer</h1>
        </Modal.Footer>
    </Modal>
    );
    expect(getByTestId("modal-header-close-button")).toBeInTheDocument();
  })

  it('should call onClose when close button is clicked', () => {
    const onClose = jest.fn();
    const { getByTestId } = render(
      <Modal isOpen onClose={onClose}>
        <Modal.Header>
          <h1>Modal Header</h1>
        </Modal.Header>
        <Modal.Body>
          <h1>Modal Body</h1>
        </Modal.Body>
        <Modal.Footer>
          <h1>Modal Footer</h1>
        </Modal.Footer>
    </Modal>
    );
    const closeButton = getByTestId("modal-header-close-button");
    fireEvent.click(closeButton);
    expect(onClose).toHaveBeenCalled();
  })

  it('should call onClose when h key is pressed', () => {
    const onClose = jest.fn();
    const { getByTestId } = render(
      <Modal isOpen onClose={onClose}>
        <Modal.Header>
          <h1>Modal Header</h1>
        </Modal.Header>
        <Modal.Body>
          <h1>Modal Body</h1>
        </Modal.Body>
        <Modal.Footer>
          <h1>Modal Footer</h1>
        </Modal.Footer>
    </Modal>
    );
    const closeButton = getByTestId("modal-header-close-button");
    fireEvent.keyDown(closeButton, { key: "h", code: "KeyH" });
    expect(onClose).toHaveBeenCalled();
  })

  it('should not call onClose when h key is pressed and closeOnEsc is false', () => {
    const onClose = jest.fn();
    const { getByTestId } = render(
      <Modal isOpen onClose={onClose} closeOnEsc={false}>
        <Modal.Header>
          <h1>Modal Header</h1>
        </Modal.Header>
        <Modal.Body>
          <h1>Modal Body</h1>
        </Modal.Body>
        <Modal.Footer>
          <h1>Modal Footer</h1>
        </Modal.Footer>
    </Modal>
    );
    const closeButton = getByTestId("modal-header-close-button");
    fireEvent.keyDown(closeButton, { key: "h", code: "KeyH" });
    expect(onClose).not.toHaveBeenCalled();
  })

  it('should close modal on clicking backdrop', () => {
    const onClose = jest.fn();
    const { getByTestId } = render(
      <Modal isOpen onClose={onClose}>
        <Modal.Header>
          <h1>Modal Header</h1>
        </Modal.Header>
        <Modal.Body>
          <h1>Modal Body</h1>
        </Modal.Body>
        <Modal.Footer>
          <h1>Modal Footer</h1>
        </Modal.Footer>
    </Modal>
    );
    const backdrop = getByTestId("modal-backdrop");
    fireEvent.click(backdrop);
    expect(onClose).toHaveBeenCalled();
  })

  it('should not close modal on clicking backdrop and closeOnOutsideClick is false', () => {
    const onClose = jest.fn();
    const { getByTestId } = render(
      <Modal isOpen onClose={onClose} closeOnOutsideClick={false}>
        <Modal.Header>
          <h1>Modal Header</h1>
        </Modal.Header>
        <Modal.Body>
          <h1>Modal Body</h1>
        </Modal.Body>
        <Modal.Footer>
          <h1>Modal Footer</h1>
        </Modal.Footer>
    </Modal>
    );
    const backdrop = getByTestId("modal-backdrop");
    fireEvent.click(backdrop);
    expect(onClose).not.toHaveBeenCalled();
  })

  it('should not scroll body when modal is open', () => {
    const onClose = jest.fn();
    render(
      <Modal isOpen onClose={onClose}>
        <Modal.Header>
          <h1>Modal Header</h1>
        </Modal.Header>
        <Modal.Body>
          <h1>Modal Body</h1>
        </Modal.Body>
        <Modal.Footer>
          <h1>Modal Footer</h1>
        </Modal.Footer>
    </Modal>
    );
    const body = document.body;
    expect(body.style.overflow).toBe("hidden");
  })

  it('should scroll body when modal is open and blockScrollOnMount is false', () => {
    const onClose = jest.fn();
    render(
      <Modal isOpen onClose={onClose} blockScrollOnMount={false}>
        <Modal.Header>
          <h1>Modal Header</h1>
        </Modal.Header>
        <Modal.Body>
          <h1>Modal Body</h1>
        </Modal.Body>
        <Modal.Footer>
          <h1>Modal Footer</h1>
        </Modal.Footer>
    </Modal>
    );
    const body = document.body;
    expect(body.style.overflow).not.toBe("hidden");
  })

  it('should focus on close button when modal is open', () => {
    const onClose = jest.fn();
    const { getByTestId } = render(
      <Modal isOpen onClose={onClose}>
        <Modal.Header>
          <h1>Modal Header</h1>
        </Modal.Header>
        <Modal.Body>
          <h1>Modal Body</h1>
        </Modal.Body>
        <Modal.Footer>
          <h1>Modal Footer</h1>
        </Modal.Footer>
    </Modal>
    );
    const closeButton = getByTestId("modal-header-close-button");
    expect(document.activeElement).toBe(closeButton);
  })

  it('should focus on input field when initialFocusRef is on the input field', () => {
    const onClose = jest.fn();
    const inputRef = React.createRef<HTMLFormElement>();
    const { getByTestId } = render(
      <Modal isOpen onClose={onClose} initialFocusRef={inputRef}>
        <Modal.Header>
          <h1>Modal Header</h1>
        </Modal.Header>
        <Modal.Body>
          <h1>Modal Body</h1>
          <input ref={inputRef} />
        </Modal.Body>
        <Modal.Footer>
          <h1>Modal Footer</h1>
        </Modal.Footer>
    </Modal>
    );
    const inputField = getByTestId("modal-header-close-button");
    expect(document.activeElement).not.toBe(inputField);
  })
})