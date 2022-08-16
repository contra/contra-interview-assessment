import { render } from '@testing-library/react';
import { ModalContainer } from '../components/modalContainer';
import '@testing-library/jest-dom/extend-expect';

describe(`Modal Component Test`, () => {
  it(`renders modal`, () => {
    const container = render(
      <ModalContainer
        handleClose={() => alert('hi')}
        isOpen={true}
        modalContent="Modal Content"
      />
    );

    expect(container.getByText('Modal Content')).toBeInTheDocument;
  });
});
