import { NextPage } from 'next';
import React, { useState } from 'react';
import styles from './index.module.css';
import useModal from '../hooks/useModal';
import Modal from '../components/Modal/Modal';
import { ModalSizeTypes } from '../components/Modal/Modal.types';

const loremIpsum = `Lorem ipsum dolor sit amet consectetur adipisicing elit. Eius laboriosam labore, totam expedita voluptates tempore asperiores sequi, alias cum veritatis, minima dolor iste similique eos id. Porro, culpa? Officiis, placeat?`;

const Index: NextPage = () => {
  const [isModalOpen, closeModal, openModal] = useModal();
  const [modalProps, setmodalProps] = useState({
    handleClose: closeModal,
  });

  const [customTitle, setCustomTitle] = useState('');
  const [customSubmitText, setCustomSubmitText] = useState('');

  const [backdropClosable, setBackdropClosable] = useState(true);
  const [keyboardEscapable, setKeyboardEscapable] = useState(true);
  const [animate, setAnimate] = useState(true);
  const [modalSize, setModalSize] = useState(ModalSizeTypes.MEDIUM);

  const handleModalSizeChange = (event: React.FormEvent) => {
    setModalSize((event.target as HTMLInputElement).value as ModalSizeTypes);
  };

  const getModalPropsByFeature = (feature: string) => {
    let props = {};
    const defaultProps = {
      handleClose: closeModal,
      title: 'Modal Title',
    };

    switch (feature) {
      case 'basic':
        props = { title: 'Sample Modal' };
        break;
      case 'customTitle':
        props = { title: customTitle };
        break;
      case 'customHeader':
        const customHeaderJSX = (
          <h3
            style={{
              background: 'gainsboro',
              textAlign: 'center',
              padding: 10,
            }}
          >
            Custom Header JSX
          </h3>
        );
        props = { header: customHeaderJSX };
        break;
      case 'customBody':
        const customBodyJSX = (
          <div
            style={{
              background: 'gainsboro',
              textAlign: 'center',
              height: '100px',
              paddingTop: '25px',
            }}
          >
            This is Custom Body JSX passed from props
          </div>
        );
        props = { body: customBodyJSX };
        break;
      case 'customFooter':
        const customFooterJSX = (
          <div
            style={{
              background: 'whitesmoke',
              textAlign: 'right',
              padding: 10,
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}
          >
            <div>Custom Footer JSX </div>
            <div className={styles['button']} onClick={closeModal}>
              Close Modal
            </div>
          </div>
        );
        props = { footer: customFooterJSX };
        break;
      case 'submitButtonText':
        props = { submitButtonText: customSubmitText };
        break;
      case 'callbackAfterOpen':
        props = {
          onOpen: () => {
            setTimeout(() => alert('I am called after Modal Open'), 1000);
          },
        };
        break;
      case 'callbackAfterClose':
        props = {
          onClose: () => {
            setTimeout(() => alert('I am called after Modal Close'), 1000);
          },
        };
        break;
      case 'callbackAfterSubmit':
        props = { onSubmit: () => alert('I am called after Modal Submit') };
        break;
      case 'backdropClosable':
        props = { backdropClosable: backdropClosable };
        break;
      case 'keyboardEscapable':
        props = { keyboardEscapable: keyboardEscapable };
        break;
      case 'customSize':
        props = { size: modalSize };
        break;
      case 'animatable':
        props = { animate: animate };
        break;

      default:
        break;
    }

    setmodalProps({ ...defaultProps, ...props });
    openModal();
  };

  const renderApiDocumentation = () => {
    return (
      <>
        <div>
          <span>Modal API Documentation</span>
        </div>
        <table>
          <thead>
            <tr>
              <th>Property</th>
              <th>Description</th>
              <th>Type</th>
              <th>Try it out !</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Base Modal</td>
              <td>
                PS: this not a property just a reference to render Base Modal
                with default params
              </td>
              <td>-</td>
              <td>
                <div
                  className={styles['button']}
                  onClick={() => getModalPropsByFeature('basic')}
                >
                  Open Modal
                </div>
              </td>
            </tr>
            <tr>
              <td>isOpen</td>
              <td>Open/Close state of modal (required)</td>
              <td>boolean</td>
              <td>refer base modal</td>
            </tr>
            <tr>
              <td>handleClose</td>
              <td>function to close modal (required)</td>
              <td>function</td>
              <td>refer base modal</td>
            </tr>
            <tr>
              <td>title</td>
              <td>title for the modal (optional)</td>
              <td>string</td>
              <td>
                <label>
                  <input
                    type="text"
                    name="custom title"
                    value={customTitle}
                    placeholder="Enter here your Custom Text for Title"
                    onChange={(event) => setCustomTitle(event.target.value)}
                    className={styles['input']}
                  />
                </label>
                <br />
                <div
                  className={styles['button']}
                  onClick={() => getModalPropsByFeature('customTitle')}
                >
                  Open Modal
                </div>
              </td>
            </tr>
            <tr>
              <td>header</td>
              <td>custom header for modal (optional)</td>
              <td>React.ReactNode</td>
              <td>
                <div
                  className={styles['button']}
                  onClick={() => getModalPropsByFeature('customHeader')}
                >
                  Open Modal
                </div>
              </td>
            </tr>
            <tr>
              <td>body</td>
              <td>custom header for modal (optional)</td>
              <td>React.ReactNode</td>
              <td>
                <div
                  className={styles['button']}
                  onClick={() => getModalPropsByFeature('customBody')}
                >
                  Open Modal
                </div>
              </td>
            </tr>
            <tr>
              <td>footer</td>
              <td>custom footer for modal (optional)</td>
              <td>React.ReactNode</td>
              <td>
                <div
                  className={styles['button']}
                  onClick={() => getModalPropsByFeature('customFooter')}
                >
                  Open Modal
                </div>
              </td>
            </tr>
            <tr>
              <td>submitButtonText</td>
              <td>
                custom text for submit button (default value : "Submit")
                (optional)
              </td>
              <td>string</td>
              <td>
                <label>
                  <input
                    type="text"
                    name="custom submit"
                    value={customSubmitText}
                    onChange={(event) => setCustomSubmitText(event.target.value)}
                    className={styles['input']}
                    placeholder="Enter here Custom Text for Submit button"
                  />
                </label>
                <div
                  className={styles['button']}
                  onClick={() => getModalPropsByFeature('submitButtonText')}
                >
                  Open Modal
                </div>
              </td>
            </tr>
            <tr>
              <td>onSubmit</td>
              <td>callback Function to run after submit click (optional)</td>
              <td>function</td>
              <td>
                <div
                  className={styles['button']}
                  onClick={() => getModalPropsByFeature('callbackAfterSubmit')}
                >
                  Open Modal
                </div>
              </td>
            </tr>
            <tr>
              <td>onClose</td>
              <td>callback Function to run after modal is closed (optional)</td>
              <td>function</td>
              <td>
                <div
                  className={styles['button']}
                  onClick={() => getModalPropsByFeature('callbackAfterClose')}
                >
                  Open Modal
                </div>
              </td>
            </tr>
            <tr>
              <td>onOpen</td>
              <td>callback to run after modal opens (optional)</td>
              <td>function</td>
              <td>
                <div
                  className={styles['button']}
                  onClick={() => getModalPropsByFeature('callbackAfterOpen')}
                >
                  Open Modal
                </div>
              </td>
            </tr>
            <tr>
              <td>backdropClosable</td>
              <td>
                allows modal to be closed if clicked outside the modal (default
                value : true) (optional)
              </td>
              <td>boolean</td>
              <td>
                <label>
                  Should modal close on clicking outside?
                  <input
                    type="checkbox"
                    name="backdropClosable"
                    checked={backdropClosable}
                    onChange={(event) => setBackdropClosable(event.target.checked)}
                  />
                </label>
                <div
                  className={styles['button']}
                  onClick={() => getModalPropsByFeature('backdropClosable')}
                >
                  Open Modal
                </div>
              </td>
            </tr>
            <tr>
              <td>keyboardEscapable</td>
              <td>
                allows modal to be closed if Esc key is pressed (default value :
                true) (optional)
              </td>
              <td>boolean</td>
              <td>
                <label>
                  Should modal close on clicking Esc key?
                  <input
                    type="checkbox"
                    name="keyboardEscapable"
                    checked={keyboardEscapable}
                    onChange={(event) => setKeyboardEscapable(event.target.checked)}
                  />
                </label>
                <div
                  className={styles['button']}
                  onClick={() => getModalPropsByFeature('keyboardEscapable')}
                >
                  Open Modal
                </div>
              </td>
            </tr>
            <tr>
              <td>size</td>
              <td>3 types of default sizes that can be set (optional)</td>
              <td>ENUM[SMALL, MEDIUM, LARGE]</td>
              <td>
                <label>
                  Select a size for modal
                  <select
                    className={styles['selectSize']}
                    value={modalSize}
                    onChange={handleModalSizeChange}
                  >
                    <option value={ModalSizeTypes.SMALL}>
                      {ModalSizeTypes.SMALL}
                    </option>
                    <option value={ModalSizeTypes.MEDIUM}>
                      {ModalSizeTypes.MEDIUM}
                    </option>
                    <option value={ModalSizeTypes.LARGE}>
                      {ModalSizeTypes.LARGE}
                    </option>
                  </select>
                </label>
                <div
                  className={styles['button']}
                  onClick={() => getModalPropsByFeature('customSize')}
                >
                  Open Modal
                </div>
              </td>
            </tr>
            <tr>
              <td>animate</td>
              <td>animate modal (by default true) (optional)</td>
              <td>boolean</td>
              <td>
                <label>
                  Should modal animate?
                  <input
                    type="checkbox"
                    name="animate"
                    checked={animate}
                    onChange={(event) => setAnimate(event.target.checked)}
                  />
                </label>
                <br />
                <div
                  className={styles['button']}
                  onClick={() => getModalPropsByFeature('animatable')}
                >
                  Open Modal
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </>
    );
  };

  return (
    <>
      <div className={!isModalOpen ? styles['App'] : styles['AppScrollLocked']}>
        {renderApiDocumentation()}
      </div>
      {isModalOpen &&
        <Modal
          isOpen={isModalOpen}
          {...modalProps}>
          {loremIpsum}
        </Modal>}
    </>
  );
};

export default Index;
