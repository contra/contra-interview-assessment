import { type AppProps } from 'next/app';
import { ThemeProvider } from 'styled-components';
import { theme } from '../common/theme';
import Head from 'next/head';
import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  body {
    font-family: 'Poppins', sans-serif;
  }
`;

const App = ({ Component, pageProps }: AppProps) => {
  return (
    <ThemeProvider theme={theme}>
      <Head>
        <html lang="en" />
        <link
          href="https://fonts.googleapis.com/css2?family=Montserrat:wght@300;400;500;600;700&display=swap"
          rel="stylesheet"
        />
        <title>Contra Modal</title>
      </Head>
      <GlobalStyle />
      <Component {...pageProps} />
    </ThemeProvider>
  );
};

export default App;
