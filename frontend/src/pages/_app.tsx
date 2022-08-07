/* eslint-disable canonical/filename-match-exported */
import { type AppProps } from 'next/app';
import 'app.css';
import '@fontsource/inter';
import '@fontsource/inter/600.css';

const App = ({ Component, pageProps }: AppProps) => {
  return (
    <>
      <Component {...pageProps} />
      <div id="modal-root" />
    </>
  );
};

export default App;
