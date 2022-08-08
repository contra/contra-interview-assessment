/* eslint-disable canonical/filename-match-exported */
import { type NextPage } from 'next';
import { useState } from 'react';
import ExampleBox from '@/components/ExampleBox';
import Modal from '@/components/Modal';
import SimpleButton from '@/components/SimpleButton';
import { wrapperStyle, exampleBoxWrapper } from './index.css';

type Modals = {
  baby: boolean;
  basic: boolean;
  customFooter: boolean;
  customHeader: boolean;
  customWidth: boolean;
  destroyOnClose: boolean;
  escapable: boolean;
  momma: boolean;
  openedCallback: boolean;
  poppa: boolean;
};

const Index: NextPage = () => {
  const [modals, setModals] = useState<Modals>({
    baby: false,
    basic: false,
    customFooter: false,
    customHeader: false,
    customWidth: false,
    destroyOnClose: false,
    escapable: false,
    momma: false,
    openedCallback: false,
    poppa: false,
  });

  const updateModal = (modal: keyof Modals, visible: boolean) => {
    setModals((previous) => ({ ...previous, [modal]: visible }));
  };

  return (
    <div className={wrapperStyle}>
      <h1>Modal</h1>
      <p>
        Modals are a common UI pattern in web applications, but implementing
        them in a correct, accessible, and performant way is an exercise in
        frontend engineering at its finest. This is my attempt at implementing a
        lightweight, foundational Modal component in React from scratch!
      </p>
      <h2>Examples</h2>
      <div className={exampleBoxWrapper}>
        {/* Basic */}
        <ExampleBox description="Just a simple modal" title="Basic">
          <SimpleButton
            onClick={() => updateModal('basic', true)}
            type="primary"
          >
            Open Modal
          </SimpleButton>
        </ExampleBox>
        <Modal
          onCancel={() => updateModal('basic', false)}
          onOk={() => updateModal('basic', false)}
          title="Basic Modal"
          visible={modals.basic}
        >
          <p>Some contents...</p>
          <p>Some contents...</p>
          <p>Some contents...</p>
        </Modal>

        {/* Stacked */}
        <ExampleBox description="A group of stacked modals" title="Stacked">
          <SimpleButton
            onClick={() => updateModal('poppa', true)}
            type="primary"
          >
            Open First Modal
          </SimpleButton>
        </ExampleBox>
        <Modal
          okButtonText="Say Hi to Momma"
          onCancel={() => updateModal('poppa', false)}
          onOk={() => updateModal('momma', true)}
          title="Poppa Modal"
          visible={modals.poppa}
        >
          <p>I am the first modal.</p>
          <p>There are others too</p>
          <p>Go say 👋🏼 to Momma</p>
        </Modal>
        <Modal
          onCancel={() => updateModal('baby', false)}
          title="Baby Modal"
          visible={modals.baby}
        >
          <p>I am the last modal</p>
          <p>👶🏼</p>
        </Modal>
        <Modal
          okButtonText="Greet the Baby"
          onCancel={() => updateModal('momma', false)}
          onOk={() => updateModal('baby', true)}
          title="Momma Modal"
          visible={modals.momma}
        >
          <p>I am modal in the middle</p>
          <p>There is still one more</p>
        </Modal>

        {/* Destroy onClose */}
        <ExampleBox
          description="Another simple modal but it gets destroyed when it is closed"
          title="Destroy onClose"
        >
          <SimpleButton
            onClick={() => updateModal('destroyOnClose', true)}
            type="primary"
          >
            Open Modal
          </SimpleButton>
        </ExampleBox>
        <Modal
          destroyOnClose
          onCancel={() => updateModal('destroyOnClose', false)}
          title="💥 when I close"
          visible={modals.destroyOnClose}
        >
          <p>Bye Bye 😭</p>
        </Modal>

        {/* Escapable and MaskClosable */}
        <ExampleBox
          description={
            <>
              Modals by default can be closed by pressing{' '}
              <strong>escape</strong> or by{' '}
              <strong>clicking on the mask</strong> under the modal. Both can be
              disabled by setting <code>escapable</code> and{' '}
              <code>maskClosable</code> props to <code>false</code>
            </>
          }
          title="Escapable and MaskClosable"
        >
          <SimpleButton
            onClick={() => updateModal('escapable', true)}
            type="primary"
          >
            Open Modal
          </SimpleButton>
        </ExampleBox>
        <Modal
          escapable={false}
          maskClosable={false}
          onCancel={() => updateModal('escapable', false)}
          title="No Escape!"
          visible={modals.escapable}
        >
          <p>
            I can't be closed by <strong>Escape</strong> or by clicking on the{' '}
            <strong>Mask</strong>
          </p>
        </Modal>

        {/* Custom Header */}
        <ExampleBox
          description="You can create your own header for the modal if the default isn't your style"
          title="Custom Header"
        >
          <SimpleButton
            onClick={() => updateModal('customHeader', true)}
            type="primary"
          >
            Open Modal with Custom Header
          </SimpleButton>
        </ExampleBox>
        <Modal
          header={
            <h1 style={{ margin: 0, padding: '16px 24px' }}>
              My Custom Header 🤟🏻
            </h1>
          }
          onCancel={() => updateModal('customHeader', false)}
          visible={modals.customHeader}
        >
          <p>I did it my way!!</p>
        </Modal>

        {/* Custom Footer */}
        <ExampleBox
          description="You can create a custom footer as well"
          title="Custom Footer"
        >
          <SimpleButton
            onClick={() => updateModal('customFooter', true)}
            type="primary"
          >
            Open Modal with Custom Footer
          </SimpleButton>
        </ExampleBox>
        <Modal
          footer={
            <div style={{ padding: '16px 24px', textAlign: 'center' }}>
              <SimpleButton onClick={() => updateModal('customFooter', false)}>
                Close Me
              </SimpleButton>
            </div>
          }
          onCancel={() => updateModal('customFooter', false)}
          title="Modal with Custom Footer"
          visible={modals.customFooter}
        >
          <p>I did it my way again!!</p>
        </Modal>

        {/* Custom Width */}
        <ExampleBox
          description="Maybe you want a wider or narrower modal. You can do that too while still keeping things responsive"
          title="Custom Width"
        >
          <SimpleButton
            onClick={() => updateModal('customWidth', true)}
            type="primary"
          >
            Open Wide Modal
          </SimpleButton>
        </ExampleBox>
        <Modal
          onCancel={() => updateModal('customFooter', false)}
          title="Modal with Custom Footer"
          visible={modals.customWidth}
          width="1000px"
        >
          <p>I am about 1000px wide!</p>
        </Modal>

        {/* On Opened */}
        <ExampleBox
          description="We let you know when a modal is opened as well"
          title="Modal Opened Callback"
        >
          <SimpleButton
            onClick={() => updateModal('openedCallback', true)}
            type="primary"
          >
            Open Modal
          </SimpleButton>
        </ExampleBox>
        <Modal
          onCancel={() => updateModal('openedCallback', false)}
          // eslint-disable-next-line no-alert
          onOpened={() => alert(`Surprise 🎉`)}
          title="Opened!"
          visible={modals.openedCallback}
        >
          <p>I do stuff when I am opened</p>
        </Modal>
      </div>
    </div>
  );
};

export default Index;
