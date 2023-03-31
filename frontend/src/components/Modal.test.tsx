import { render, screen } from '@testing-library/react'
import Modal from './Modal';
// eslint-disable-next-line import/no-unassigned-import
import '@testing-library/jest-dom'

const onCloseHandler = jest.fn(() => {});

describe('Modal', () => {

    it('no show', () => {
        const { container } = render(<Modal handleClose={onCloseHandler} show={false} title="Modal">Modal Content</Modal>);

        expect(container).toMatchSnapshot();

        const title = screen.queryByText('Modal');

        expect(onCloseHandler.mock.calls).toHaveLength(0);
        expect(title).toBeFalsy();
    });

    it('show', async () => {
        expect.hasAssertions();

        const { container } = render(<Modal animate={false} handleClose={onCloseHandler} show title="Modal">Modal Content</Modal>);

        expect(container).toMatchSnapshot();

        await screen.findByText('Modal');
        expect(onCloseHandler.mock.calls).toHaveLength(0);
    });

    it('close', async () => {
        expect.hasAssertions();

        render(<Modal animate={false} handleClose={onCloseHandler} show title="Modal">Modal Content</Modal>);

        const close = await screen.findByText('Close');
        close.click();

        expect(onCloseHandler.mock.calls).toHaveLength(1);
    });
});