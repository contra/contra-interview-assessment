/* eslint-disable canonical/filename-match-exported */
import { type AppProps } from 'next/app';
// eslint-disable-next-line import/no-unassigned-import
import './styles.css';

const App = ({ Component, pageProps }: AppProps) => {
  return <Component {...pageProps} />;
};

export default App;
