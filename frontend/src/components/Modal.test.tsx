import {render} from '@testing-library/react';
import Modal from './Modal'
import '@testing-library/jest-dom'


describe('modal', () => {
  let expectedProps;
  let modal;
  beforeEach(() => {
    expectedProps = {
      modals: [
        {
          active: 'A',
          valueA: 1,
          valueB: 100,
          diffX: 0,
          diffY: 0,
          dragging: false,
          styles: {zIndex: 10, top: 0, left: 0},
        }
      ],
      setModals: () => {},
      index: 0
    }
    const portalContainer = document.createElement('div');
    portalContainer.id = 'portal';
    document.body.appendChild(portalContainer)
    modal = render(<Modal {...expectedProps}/>)
  })
  it('displays only value A and not B initially', () => {
    expect(modal.getByText('Value 🅰️: 1')).toBeInTheDocument();    
    expect(modal.queryByText('Value 🅱️: 100')).not.toBeInTheDocument();
  })
})