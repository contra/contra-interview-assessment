/* eslint-disable canonical/filename-match-exported */
import { type AppProps } from 'next/app';

import '../styles/flex.css'
import '../styles/font.css'
import '../styles/modal.css'
import '../styles/button.css'
import '../styles/general.css'
import '../styles/container.css'

const App = ({ Component, pageProps }: AppProps) => {
  return <Component {...pageProps} />;
};

export default App;
