/* eslint-disable canonical/filename-match-exported */
// eslint-disable-next-line import/no-unassigned-import
import '../app.css';
import { type AppProps } from 'next/app';

const App = ({ Component, pageProps }: AppProps) => {
  return <Component {...pageProps} />;
};

export default App;
