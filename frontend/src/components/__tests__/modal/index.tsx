import {render, screen, waitFor} from '@testing-library/react';
import '@testing-library/jest-dom';
import Modal from '../../modal/Modal';

describe('Modal', () => {
  it('creates root modal element in body', () => {
    render(
      <Modal title="Test">
        <div></div>
      </Modal>
    );

    const modalRoot: HTMLElement | null = document.querySelector('#modal-root');

    expect(modalRoot).toBeInstanceOf(HTMLElement);
    expect(modalRoot?.parentNode).toBeInstanceOf(HTMLBodyElement)
  });

  it('disables scrolling', () => {
    expect(document.body.style.overflow).toEqual('unset');

    render(
      <Modal title="Test">
        <div></div>
      </Modal>
    );

    expect(document.body.style.overflow).toEqual('hidden');
  });

  it('stack modals', async () => {
    render(
      <div>
        <Modal title="Test 1">
          <div></div>
        </Modal>
        <Modal title="Test 2">
          <div></div>
        </Modal>
      </div>);

    await waitFor(()=>{
      expect(screen.getByRole('heading', {name: 'Test 1'})).toBeInTheDocument();
      expect(screen.getByRole('heading', {name: 'Test 2'})).toBeInTheDocument();
      expect(screen.getByRole('heading', {name: 'Test 2'})).toBeVisible();
    });
  });
});
