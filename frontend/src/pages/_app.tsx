/* eslint-disable canonical/filename-match-exported */
import { type AppProps } from 'next/app';
import './styles.css';

const App = ({ Component, pageProps }: AppProps) => {
  return <Component {...pageProps} />;
};

export default App;
