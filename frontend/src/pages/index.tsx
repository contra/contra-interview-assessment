/* eslint-disable canonical/filename-match-exported */
import { type NextPage } from 'next';
import { useState } from 'react';
import { ThemeProvider } from 'styled-components';
import translation from '@/assets/mockedTranslation.json';
import Modal from '@/components/Modal';
import ContentModal from '@/components/Modal/ContentModal';
import DialogModal from '@/components/Modal/DialogModal';
import ModalSelector from '@/components/ModalSelector';
import GlobalStyle from '@/styled/GlobalStyle';
import { darkTheme, lightTheme } from '@/styled/themes';

const Index: NextPage = () => {
  const [openModal, setOpenModal] = useState<
    boolean | 'Base' | 'Content' | 'Dialog'
  >(false);
  const [theme, setTheme] = useState<'dark' | 'light'>('light');

  return (
    <ThemeProvider theme={theme === 'light' ? lightTheme : darkTheme}>
      <GlobalStyle />
      <ModalSelector
        onSelectModal={(modal) => setOpenModal(modal)}
        onSwitchTheme={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
      />
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
      />
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
