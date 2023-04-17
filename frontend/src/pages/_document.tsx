import { Html, Head, Main, NextScript } from 'next/document';

export default function Document() {
  return (
    <Html>
      <Head />
      <body>
        <div id="contra_modal_container" />
        <style>{`
html {
  height: 100%;
}

body {
  min-height: 100%;
  width: 100%;
  margin: 0;
  overflow-y: scroll;
}

html.noscroll #contra_modal_container {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(47,47,47,0.6);
  z-index: 999999;
}

html.noscroll, html.noscroll > body {
  position: fixed;
}
      `}</style>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
