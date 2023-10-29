import { render, screen } from '@testing-library/react'
import Button from './Button';
// eslint-disable-next-line import/no-unassigned-import
import '@testing-library/jest-dom'

const onClickHandler = jest.fn(() => {});

describe('Button', () => {

    it('onClick', () => {
        const { container } = render(<Button onClick={onClickHandler}>ClickMe</Button>);

        expect(container).toMatchSnapshot();

        screen.getByText('ClickMe').click();

        expect(onClickHandler.mock.calls).toHaveLength(1);
    });
});