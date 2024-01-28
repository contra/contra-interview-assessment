/* eslint-disable canonical/filename-match-exported, import/no-unassigned-import */
import { type AppProps } from 'next/app';
import { ModalStackProvider } from '@/context/ModalContext';
import './globals.css';

const App = ({ Component, pageProps }: AppProps) => {
  return (
    <ModalStackProvider>
      <Component {...pageProps} />
    </ModalStackProvider>
  );
};

export default App;
