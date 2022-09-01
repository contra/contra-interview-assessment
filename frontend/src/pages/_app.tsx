/* eslint-disable import/no-unassigned-import */
/* eslint-disable canonical/filename-match-exported */
import { type AppProps } from 'next/app';
import '../styles/globals.css';

const App = ({ Component, pageProps }: AppProps) => {
  return <Component {...pageProps} />;
};

export default App;
