import Document, { Html, Head, Main, NextScript } from "next/document";

export default class myDocument extends Document {
  render(){
    return (
      <Html>
        <Head />
        <body>
          <Main />
          <div id="portal"/>
          <NextScript />
        </body>
      </Html>
    )
  }
}