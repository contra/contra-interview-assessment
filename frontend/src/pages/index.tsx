/* eslint-disable canonical/filename-match-exported */
import { type NextPage } from 'next';
import Head from 'next/head';
import { useState } from 'react';
import { ThemeProvider } from 'styled-components';
import translation from '@/assets/mockedTranslation.json';
import Button from '@/components/Button';
import Modal from '@/components/Modal';
import ContentModal from '@/components/Modal/ContentModal';
import DialogModal from '@/components/Modal/DialogModal';
import ModalSelector from '@/components/ModalSelector';
import GlobalStyle from '@/styled/GlobalStyle';
import { darkTheme, lightTheme } from '@/styled/themes';

const Index: NextPage = () => {
  const [openModal, setOpenModal] = useState<
    boolean | 'Base' | 'Content' | 'Dialog' | 'Nested' | 'NestedChildren'
  >(false);
  const [theme, setTheme] = useState<'dark' | 'light'>('light');

  return (
    <>
      <Head>
        <title>Contra Modal</title>
      </Head>

      <ThemeProvider theme={theme === 'light' ? lightTheme : darkTheme}>
        <GlobalStyle />
        <ModalSelector
          onSelectModal={(modal) => setOpenModal(modal)}
          onSwitchTheme={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
        />
        <Modal
          isOpen={openModal === 'Base'}
          onClose={() => setOpenModal(false)}
        >
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
        />
        <ContentModal
          isOpen={openModal === 'Content'}
          onClose={() => setOpenModal(false)}
          text={translation.longText}
          title={translation.modalTitle}
        />

        <Modal
          isOpen={openModal === 'Nested' || openModal === 'NestedChildren'}
          onClose={() => setOpenModal(false)}
        >
          <Button onClick={() => setOpenModal('NestedChildren')}>
            Open Nested
          </Button>
          <Modal
            isOpen={openModal === 'NestedChildren'}
            onClose={() => setOpenModal('Nested')}
          >
            Hey There
          </Modal>
        </Modal>
        <p>
          {translation.longText} {translation.longText} {translation.longText}
          {translation.longText}
        </p>
      </ThemeProvider>
    </>
  );
};

export default Index;
