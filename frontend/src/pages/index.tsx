import { type NextPage } from 'next';
import React, { useState } from 'react';
import Modal from '../components/Modal/Modal';
import { ModalSizeTypes } from '../components/Modal/Modal.types';
import ModalStack from '../components/ModalStack/ModalStack';
import useModal from '../hooks/useModal';
import styles from './index.module.css';

const loremIpsum = `Lorem ipsum dolor sit amet consectetur adipisicing elit. Eius laboriosam labore, totam expedita voluptates tempore asperiores sequi, alias cum veritatis, minima dolor iste similique eos id. Porro, culpa? Officiis, placeat?`;

const Index: NextPage = () => {
  const closeModalFunction = (pos: number = 0) => {
    closeModal();
    setTimeout(() => {
      window.scrollBy(0, pos);
    }, 100);
  };

  const [isModalOpen, closeModal, openModal] = useModal();
  const [modalProps, setmodalProps] = useState({
    handleClose: closeModalFunction,
  });

  const [customTitle, setCustomTitle] = useState('');
  const [customSubmitText, setCustomSubmitText] = useState('');
  const [customCancelText, setCustomCancelText] = useState('');
  const [backdropClosable, setBackdropClosable] = useState(false);
  const [keyboardEscapable, setKeyboardEscapable] = useState(false);
  const [animate, setAnimate] = useState(true);
  const [modalContent, setModalContent] = useState(loremIpsum);
  const [modalSize, setModalSize] = useState(ModalSizeTypes.MEDIUM);

  const handleModalSizeChange = (event: React.FormEvent) => {
    setModalSize((event.target as HTMLInputElement).value as ModalSizeTypes);
  };

  const getModalPropsByFeature = (feature: string) => {
    let props = {};
    const scrollPos = window.scrollY;
    const defaultProps = {
      handleClose: () => closeModalFunction(scrollPos),
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
              padding: 10,
              textAlign: 'center',
            }}
          >
            Custom Header JSX
          </h3>
        );
        props = { header: customHeaderJSX };
        break;
      case 'customFooter':
        const customFooterJSX = (
          <div
            style={{
              alignItems: 'center',
              background: 'whitesmoke',
              display: 'flex',
              justifyContent: 'space-between',
              padding: 10,
              textAlign: 'right',
            }}
          >
            <div>Custom Footer JSX </div>
            <div
              className={styles['button']}
              onClick={() => closeModalFunction(window.scrollY)}
            >
              Close Modal
            </div>
          </div>
        );
        props = { footer: customFooterJSX };
        break;
      case 'submitButtonText':
        props = { submitButtonText: customSubmitText };
        break;
      case 'cancelButtonText':
        props = { cancelButtonText: customCancelText };
        break;
      case 'callbackAfterOpen':
        props = {
          onOpen: () => {
            setTimeout(() => alert('I am called after Modal Open'), 1_000);
          },
        };
        break;
      case 'callbackAfterClose':
        props = {
          onClose: () => {
            setTimeout(() => alert('I am called after Modal Close'), 1_000);
          },
        };
        break;
      case 'callbackAfterSubmit':
        props = {
          onSubmit: () => {
            closeModalFunction();
            setTimeout(() => alert('I am called after Modal Submit'), 1_000);
          },
        };
        break;
      case 'callbackAfterCancel':
        props = {
          onCancel: () => {
            closeModalFunction();
            setTimeout(() => alert('I am called after Modal Cancel'), 1_000);
          },
        };
        break;
      case 'backdropClosable':
        props = { backdropClosable };
        break;
      case 'keyboardEscapable':
        props = { keyboardEscapable };
        break;
      case 'customSize':
        props = { size: modalSize };
        break;
      case 'animatable':
        props = { animate };
        break;
      case 'ModalStack':
        setModalContent('ModalStack');
        props = {
          footer: <div />,
          title: 'Modal Stack',
        };
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
                    className={styles['input']}
                    name="custom title"
                    onChange={(event) => setCustomTitle(event.target.value)}
                    placeholder="Enter here your Custom Text for Title"
                    type="text"
                    value={customTitle}
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
                    className={styles['input']}
                    name="custom submit"
                    onChange={(event) =>
                      setCustomSubmitText(event.target.value)
                    }
                    placeholder="Enter here Custom Text for Submit button"
                    type="text"
                    value={customSubmitText}
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
              <td>cancelButtonText</td>
              <td>
                custom text for cancel button (default value : "Cancel")
                (optional)
              </td>
              <td>string</td>
              <td>
                <label>
                  <input
                    className={styles['input']}
                    name="custom cancel"
                    onChange={(event) =>
                      setCustomCancelText(event.target.value)
                    }
                    placeholder="Enter here Custom Text for Cancel button"
                    type="text"
                    value={customCancelText}
                  />
                </label>
                <div
                  className={styles['button']}
                  onClick={() => getModalPropsByFeature('cancelButtonText')}
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
              <td>onCancel</td>
              <td>callback Function to run after cancel click (optional)</td>
              <td>function</td>
              <td>
                <div
                  className={styles['button']}
                  onClick={() => getModalPropsByFeature('callbackAfterCancel')}
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
                value : false) (optional)
              </td>
              <td>boolean</td>
              <td>
                <label>
                  Should modal close on clicking outside?
                  <input
                    checked={backdropClosable}
                    name="backdropClosable"
                    onChange={(event) =>
                      setBackdropClosable(event.target.checked)
                    }
                    type="checkbox"
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
                false) (optional)
              </td>
              <td>boolean</td>
              <td>
                <label>
                  Should modal close on clicking Esc key?
                  <input
                    checked={keyboardEscapable}
                    name="keyboardEscapable"
                    onChange={(event) =>
                      setKeyboardEscapable(event.target.checked)
                    }
                    type="checkbox"
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
                    onChange={handleModalSizeChange}
                    value={modalSize}
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
                    checked={animate}
                    name="animate"
                    onChange={(event) => setAnimate(event.target.checked)}
                    type="checkbox"
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
            <tr>
              <td>stacked</td>
              <td>PS: this is not a property just a reference to show stacked modals</td>
              <td>children</td>
              <td>
                <div
                  className={styles['button']}
                  onClick={() => getModalPropsByFeature('ModalStack')}
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
      <div
        className={!isModalOpen ? styles['App'] : styles['AppScrollLocked']}
        style={{ height: isModalOpen ? `${window.innerHeight - 40}px` : '' }}
      >
        {renderApiDocumentation()}
      </div>
      {isModalOpen && (
        <Modal isOpen={isModalOpen} {...modalProps}>
          {modalContent !== 'ModalStack' ? modalContent : <ModalStack />}
        </Modal>
      )}
    </>
  );
};

export default Index;
