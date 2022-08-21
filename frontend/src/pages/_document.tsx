// eslint-disable-next-line canonical/filename-match-exported
import Document, { Html, Head, Main, NextScript } from 'next/document';
import { getCssText } from '@/stitches';
import { globalStyles } from '@/styles/global';

class MyDocument extends Document {
  // eslint-disable-next-line @typescript-eslint/explicit-member-accessibility
  render() {
    globalStyles();
    return (
      <Html>
        <Head>
          <style
            // eslint-disable-next-line react/no-danger
            dangerouslySetInnerHTML={{ __html: getCssText() }}
            id="stitches"
          />

          <link
            href="https://fonts.googleapis.com/css2?family=Nunito&display=optional"
            rel="stylesheet"
          />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
