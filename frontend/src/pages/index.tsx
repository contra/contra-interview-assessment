/* eslint-disable canonical/filename-match-exported */
import { type NextPage } from 'next';
import { useState } from 'react';
import { ThemeProvider } from 'styled-components';
import Button from '@/components/Button';
import Modal from '@/components/Modal';
import GlobalStyle from '@/styled/GlobalStyle';
import { lightTheme } from '@/styled/themes';

const Index: NextPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <ThemeProvider theme={lightTheme}>
      <GlobalStyle />

      <div style={{ display: 'flex', gap: 20, margin: 10 }}>
        <Button onClick={() => setIsModalOpen(true)}>No, Cancel</Button>
        <Button onClick={() => setIsModalOpen(true)} variant="Secondary">
          Yes, Confirm
        </Button>
      </div>

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        Hey There
      </Modal>
    </ThemeProvider>
  );
};

export default Index;
