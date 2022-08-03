/* eslint-disable canonical/filename-match-exported */
import { AppProps } from 'next/app';
import './app.css';

const App = ({ Component, pageProps }: AppProps) => {
  return <Component {...pageProps} />;
};

export default App;
