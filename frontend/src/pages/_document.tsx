import Document, { Html, Head, Main, NextScript } from 'next/document';
import styled, { ServerStyleSheet } from 'styled-components';
import { CookiesModal } from '../components';

export default class MyDocument extends Document {
  static async getInitialProps(ctx){
    const initialProps = await Document.getInitialProps(ctx);
    return {...initialProps};
  }

  render() {
    return (
      <Html lang="en">
        <Head />
        <body>
          <Main />
          <NextScript />
          <div id="modal-root"></div>
        </body>
      </Html>
    );
  }
}
