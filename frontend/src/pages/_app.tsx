/* eslint-disable canonical/filename-match-exported */
import ModalContextWrapper from '@/components/context/ModalContext';
import { type AppProps } from 'next/app';

const App = ({ Component, pageProps }: AppProps) => {
  return (
    <ModalContextWrapper>
      <Component {...pageProps} />
    </ModalContextWrapper>
  );
};

export default App;
