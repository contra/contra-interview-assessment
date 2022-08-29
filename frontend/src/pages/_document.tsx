// eslint-disable-next-line canonical/filename-match-exported
import { Html, Head, Main, NextScript } from 'next/document';

const Document = () => {
  return (
    <Html>
      <Head>
        <link href="https://fonts.googleapis.com" rel="preconnect" />
        <link href="https://fonts.gstatic.com" rel="preconnect" />
        <link
          href="https://fonts.googleapis.com/css2?family=Notable&family=Roboto:wght@400;900&display=swap"
          rel="stylesheet"
        />
      </Head>
      <body>
        <Main />
        <div id="modal-root" />
        <NextScript />
      </body>
    </Html>
  );
};

export default Document;
