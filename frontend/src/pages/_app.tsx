/* eslint-disable import/no-unassigned-import, canonical/filename-match-exported */
import "wicg-inert";
import { type AppProps } from 'next/app';

const App = ({ Component, pageProps }: AppProps) => {
  return <Component {...pageProps} />;
};

export default App;
