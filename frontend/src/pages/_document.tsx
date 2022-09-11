/* eslint-disable canonical/filename-match-exported */
import { Html, Head, Main, NextScript } from 'next/document';

const Document = () => {
  return (
    <Html>
      <Head />
      <body>
        <Main />
        {/* We mount modal portal at the base of the document to contain modals */}
        <div id="modal" />
        <NextScript />
      </body>
    </Html>
  );
};

export default Document;
