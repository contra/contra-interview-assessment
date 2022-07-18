/* eslint-disable canonical/filename-match-exported */
import ModalProvider from '../Context/ModalProvider';
import { type AppProps } from 'next/app';
import React from 'react';
import '../styles.css';

const App = ({ Component, pageProps }: AppProps) => {
  return (
    <ModalProvider>
      <Component {...pageProps} />
    </ModalProvider>
  );
};

export default App;
