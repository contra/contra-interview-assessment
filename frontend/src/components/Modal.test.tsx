import { render } from '@testing-library/react';
import Modal from './Modal';

describe('modal tests', () => {
  it('modal displays with children and title', () => {
    const title = 'Testing Title';
    const { getByRole, findByText } = render(
      <Modal close={() => {}} title={title} trapFocus={false}>
        <p>
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Unde id
          repellendus in tenetur? Adipisci reprehenderit assumenda et dolorem
          error non totam voluptatum ex, ullam, harum incidunt eius ut voluptas
          ad?
        </p>
      </Modal>
    );

    expect(getByRole('heading')).not.toBeNull();
    expect(findByText('Lorem')).not.toBeNull();
  });

  it('modal displays without title', () => {
    const { queryAllByRole } = render(
      <Modal close={() => {}} trapFocus={false}>
        <p>
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Unde id
          repellendus in tenetur? Adipisci reprehenderit assumenda et dolorem
          error non totam voluptatum ex, ullam, harum incidunt eius ut voluptas
          ad?
        </p>
      </Modal>
    );

    expect(queryAllByRole('heading').length).toBeFalsy();
  });
});
