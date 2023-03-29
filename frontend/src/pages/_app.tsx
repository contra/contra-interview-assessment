/* eslint-disable canonical/filename-match-exported */
/* eslint-disable import/no-unassigned-import */
import '@/styles/globals.css';
import { type AppProps } from 'next/app';

const App = ({ Component, pageProps }: AppProps) => {
  return <Component {...pageProps} />;
};

export default App;
