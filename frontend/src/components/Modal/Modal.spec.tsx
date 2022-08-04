import ReactDOM from 'react-dom';
import renderer from 'react-test-renderer';
import Modal from './Modal.component';

describe('MyComponent', () => {
  beforeAll(() => {
    // @ts-ignore
    ReactDOM.createPortal = jest.fn((element, node) => {
      return element;
    });
  });

  afterEach(() => {
    // @ts-ignore
    ReactDOM.createPortal.mockClear();
  });

  it('should render correctly', () => {
    const component = renderer.create(<Modal isOpen={true}><p>Hello World!</p></Modal>);

    expect(component.toJSON()).toMatchSnapshot();
  });
});