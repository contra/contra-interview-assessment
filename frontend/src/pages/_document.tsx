// eslint-disable-next-line canonical/filename-match-exported
import Document, { Html, Head, Main, NextScript } from 'next/document';

export default class MainDocument extends Document {
  public render(): JSX.Element {
    return (
      <Html>
        <Head />
        <body>
          <Main />
          <div id="modal-root" />
          <NextScript />
        </body>
      </Html>
    );
  }
}
