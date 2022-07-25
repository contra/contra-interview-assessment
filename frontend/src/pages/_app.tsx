/* eslint-disable canonical/filename-match-exported */
import type { AppProps } from 'next/app';
import GlobalStyles from '@/components/GlobalStyles';
import { Header } from '@/components/Layout/Header';

import '@/styles/global.css';

const App = ({ Component, pageProps }: AppProps) => {
  return (
    <>
      <GlobalStyles />
      <Header />
      <Component {...pageProps} />
    </>
  );
};

export default App;
