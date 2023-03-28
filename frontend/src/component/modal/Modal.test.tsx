import { fireEvent, render } from '@testing-library/react'
import Modal from './Modal'

const onClose = jest.fn(() => {})

describe('Modal', () => {
    test('should render modal and test interactions successfully', async () => {
        const { getByText, getByTestId } = render(
            <Modal
                isOpen={true}
                title='Test Modal'
                onClose={onClose}
            >
                The quick brown fox jumps over the lazy dog
            </Modal>
        )

        expect( getByText(/test modal/i) ).toBeInTheDocument()
        expect( getByText(/close/i) ).toBeInTheDocument()
        expect( getByText(/the quick brown fox jumps over the lazy dog/i) ).toBeInTheDocument()

        const button = getByTestId('data-modal__close-button')

        fireEvent.click(button)

        expect(onClose).toHaveBeenCalled()
    })
})