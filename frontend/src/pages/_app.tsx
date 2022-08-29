/* eslint-disable canonical/filename-match-exported */
import { type AppProps } from 'next/app';
import Head from 'next/head';

// eslint-disable-next-line import/no-unassigned-import
import '../styles/global.css';

const App = ({ Component, pageProps }: AppProps) => (
  <>
    <Head>
      <meta content="width=device-width, initial-scale=1.0" name="viewport" />
    </Head>
    <Component {...pageProps} />
  </>
);

export default App;
