import { type AppProps } from 'next/app';
import 'uikit/dist/css/uikit.min.css';
import './app.css';

const App = ({ Component, pageProps }: AppProps) => {
  return <Component {...pageProps} />;
};

export default App;
