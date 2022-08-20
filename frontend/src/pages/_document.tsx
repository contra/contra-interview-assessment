/* eslint-disable canonical/filename-match-exported */
import { Html, Head, Main, NextScript } from 'next/document';

export const Document = () => {
  return (
    <Html lang="en">
      <Head />
      <body>
        <Main />
        <div id="portal" />
        <NextScript />
      </body>
    </Html>
  );
};

export default Document;
