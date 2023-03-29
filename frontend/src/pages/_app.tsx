/* eslint-disable canonical/filename-match-exported */
/* eslint-disable import/no-unassigned-import */
import '@/styles/globals.css';
import { ModalProvider } from '@/contexts/modal.context';
import { type AppProps } from 'next/app';

const App = ({ Component, pageProps }: AppProps) => {
  return (
    <ModalProvider>
      <Component {...pageProps} />
    </ModalProvider>
  );
};

export default App;
