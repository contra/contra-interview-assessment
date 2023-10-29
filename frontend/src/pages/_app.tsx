/* eslint-disable canonical/filename-match-exported */
import { type AppProps } from 'next/app';
import './style/global.css';

const App = ({ Component, pageProps }: AppProps) => {
  return <Component { ...pageProps } />;
};

export default App;
