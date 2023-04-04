// eslint-disable-next-line canonical/filename-match-exported
import Document, { Html, Head, Main, NextScript } from 'next/document';

export const MODAL_PORTAL_ID = 'contra-modal';

export default class MyDocument extends Document {
  public render(): JSX.Element {
    return (
      <Html>
        <Head />
        <body>
          <Main />
          <div id={MODAL_PORTAL_ID} />
          <NextScript />
        </body>
      </Html>
    );
  }
}
