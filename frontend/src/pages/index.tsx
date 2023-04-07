/* eslint-disable canonical/filename-match-exported */
import { type NextPage } from 'next';
import { useState } from 'react';
import { ThemeProvider } from 'styled-components';
import translation from '@/assets/mockedTranslation.json';
import Button from '@/components/Button';
import Modal from '@/components/Modal';
import ContentModal from '@/components/Modal/ContentModal';
import DialogModal from '@/components/Modal/DialogModal';
import GlobalStyle from '@/styled/GlobalStyle';
import { lightTheme } from '@/styled/themes';

const Index: NextPage = () => {
  const [openModal, setOpenModal] = useState<
    boolean | 'Base' | 'Content' | 'Dialog'
  >(false);

  return (
    <ThemeProvider theme={lightTheme}>
      <GlobalStyle />

      <div style={{ display: 'flex', gap: 20, margin: 10 }}>
        <Button onClick={() => setOpenModal('Base')}>Open Base Modal</Button>
        <Button onClick={() => setOpenModal('Content')} variant="Secondary">
          Open Content Modal
        </Button>
        <Button onClick={() => setOpenModal('Dialog')}>
          Open Dialog Modal
        </Button>
      </div>

      <Modal isOpen={openModal === 'Base'} onClose={() => setOpenModal(false)}>
        {translation.regularText}
      </Modal>
      <DialogModal
        cancelLabel={translation.noButton}
        confirmLabel={translation.yesButton}
        isOpen={openModal === 'Dialog'}
        onClickCancel={() => setOpenModal(false)}
        onClickConfirm={() => {}}
        onClose={() => setOpenModal(false)}
        text={translation.regularText}
        title={translation.modalTitle}
      >
        Hey There
      </DialogModal>
      <ContentModal
        isOpen={openModal === 'Content'}
        onClose={() => setOpenModal(false)}
        text={translation.longText}
        title={translation.modalTitle}
      />
    </ThemeProvider>
  );
};

export default Index;
