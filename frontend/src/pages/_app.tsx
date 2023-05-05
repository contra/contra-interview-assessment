/* eslint-disable canonical/filename-match-exported, import/no-unassigned-import */
import { type AppProps } from 'next/app';
import './globals.css';

const App = ({ Component, pageProps }: AppProps) => {
  return <Component {...pageProps} />;
};

export default App;
