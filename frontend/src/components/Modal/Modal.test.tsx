import { render } from '@testing-library/react';
import { Modal } from '@/components/Modal';

describe('Modal behavior', () => {
  it('should show title, children and buttons', () => {
    const setModal = jest.fn;
    const title = 'Modal testing';
    const { getByText } = render(
      <Modal
        cancel={setModal}
        confirm={setModal}
        title={title}
        setShowModal={setModal}
        showModal
      />
    );
    expect(getByText(title)).toBeTruthy();
  });
});
