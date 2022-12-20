import Document, { Html, Head, Main, NextScript } from "next/document";

class MyDocument extends Document {
  render() {
    return (
      <Html lang="en">
        <Head>
        <meta name="description" content="Amanullah Nirob Hotel application" />
                <link rel="manifest" href="/manifest.json" />
                <meta name="keywords" content="amanullah nirob, hotel, programmer, best hafej,best programmer" />
                <link rel="shortcut icon" href={'/static/images/fav.png'} />
                <link rel="icon" href={'/static/images/fav.png'} sizes="32x32" />
                <link rel="icon" href={'/static/images/fav.png'} sizes="192x192" />
                <link rel="apple-touch-icon-precomposed" href={'/static/images/fav.png'} />
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
