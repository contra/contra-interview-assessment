/* eslint-disable canonical/filename-match-exported */
import { type AppProps } from 'next/app';
import 'app.css';
import '@fontsource/inter';

const App = ({ Component, pageProps }: AppProps) => {
  return <Component {...pageProps} />;
};

export default App;
