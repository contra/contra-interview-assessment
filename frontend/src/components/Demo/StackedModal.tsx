import { useState } from 'react';
import Box from '../Box/Box';
import {
  type ModalRootProps,
  ModalClose,
  ModalContent,
  ModalDescription,
  ModalRoot,
  ModalTitle,
} from '../Modal';
import ModalTrigger from '../Modal/components/ModalTrigger';

const ChildModal = (props: ModalRootProps) => {
  return (
    <ModalRoot shouldShowOverlay {...props}>
      {props.children}
      <ModalContent css={{ width: '400px' }}>
        <ModalTitle>This is a child modal</ModalTitle>
        <ModalDescription>
          This is the nested modal that got opened by an element in another
          modal.
        </ModalDescription>
        <ModalClose>Close this modal and go back to previous one</ModalClose>
      </ModalContent>
    </ModalRoot>
  );
};

const ParentModal = (props: ModalRootProps) => {
  return (
    <ModalRoot shouldShowOverlay {...props}>
      {props.children}
      <ModalContent>
        <ModalTitle>Nested modals</ModalTitle>
        <ModalDescription>
          This is a demo where we can open a modal from within a modal. Click on
          "Show another modal" button to see another modal open.
        </ModalDescription>
        <ChildModal>
          <ModalTrigger>Show another modal</ModalTrigger>
        </ChildModal>
        <ModalClose shouldBeAtTopRight variant="primary">
          Close
        </ModalClose>
      </ModalContent>
    </ModalRoot>
  );
};

const StackedModal = () => {
  const [showParentModal, setShowParentModal] = useState(false);

  return (
    <Box as="section">
      <h2>Stacked modal</h2>
      <p>
        Modals can be stacked as it is for when just showing modals
        one-at-a-time just isn't enough.
      </p>
      <Box
        css={{
          border: `1px solid $primary500`,
          borderRadius: '1rem',
          display: 'flex',
          justifyContent: 'center',
          margin: '1rem auto',
          padding: '1rem 0.5rem',
        }}
      >
        <ParentModal isOpen={showParentModal} onOpenChange={setShowParentModal}>
          <ModalTrigger
            onClick={() => setShowParentModal(true)}
            variant="primary"
          >
            Click here to view stacked modals
          </ModalTrigger>
        </ParentModal>
      </Box>
    </Box>
  );
};

export default StackedModal;
