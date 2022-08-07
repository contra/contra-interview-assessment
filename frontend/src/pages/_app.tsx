/* eslint-disable canonical/filename-match-exported */
import { type AppProps } from 'next/app';
// eslint-disable-next-line import/no-unassigned-import
import 'app.css';
// eslint-disable-next-line import/no-unassigned-import
import '@fontsource/inter';
// eslint-disable-next-line import/no-unassigned-import
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
