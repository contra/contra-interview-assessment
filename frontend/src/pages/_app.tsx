/* eslint-disable canonical/filename-match-exported */
import type { AppProps } from 'next/app';
import { ApolloProvider } from '@apollo/client';
import GlobalStyles from '@/components/GlobalStyles';
import { Header } from '@/components/Layout/Header';
import { client } from '@/lib/client/apollo';

import '@/styles/global.css';

const App = ({ Component, pageProps }: AppProps) => {
  return (
    <ApolloProvider client={client}>
      <GlobalStyles />
      <Header />
      <Component {...pageProps} />
    </ApolloProvider>
  );
};

export default App;
