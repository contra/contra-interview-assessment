import { fireEvent, render, screen } from '@testing-library/react'
import { useState } from 'react';
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

        const onCloseMock = jest.fn();

        const Wrapper = () => {
            const [showModal, setShowModal] = useState(true);

            onCloseMock.mockImplementation(() => {
                setShowModal(false);
            });

            return <Modal animate={false} handleClose={onCloseMock} show={showModal} title="Modal">Modal Content</Modal>;
        }
        
        render(<Wrapper />);
        
        const close = await screen.findByText('Close');
        fireEvent.click(close);

        expect(onCloseMock.mock.calls).toHaveLength(1);

        const title = screen.queryByText('Modal');
        expect(title).toBeNull();

    });
});