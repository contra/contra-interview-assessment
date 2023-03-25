/* eslint-disable canonical/filename-match-exported */
import { type AppProps } from 'next/app';
import { ModalProvider } from '@/contexts/modal.context';
import '@/styles/globals.css';

const App = ({ Component, pageProps }: AppProps) => {
  return (
    <ModalProvider>
      <Component {...pageProps} />
    </ModalProvider>
  );
};

export default App;
