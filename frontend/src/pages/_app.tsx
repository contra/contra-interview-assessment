/* eslint-disable canonical/filename-match-exported */
import { type AppProps } from 'next/app';
/**
 * We could use Next.js's CSS Modules here,
 *  but hypothetically this Modal component
 *  should also work outside Next.js. (like being exported in a library)
 * So we're importing it like if it was global CSS.
 */
import '../components/modal/modal.css';

const App = ({ Component, pageProps }: AppProps) => {
  return <Component {...pageProps} />;
};

export default App;
