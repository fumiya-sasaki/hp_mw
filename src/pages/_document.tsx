import { Html, Head, Main, NextScript } from 'next/document';
import { Footer } from '../components/common/Footer';

export default function Document() {
  return (
    <Html lang='ja'>
      <Head>
        <script src='https://cdn.jsdelivr.net/npm/swiper@9/swiper-element-bundle.min.js'></script>
        <link
          rel='stylesheet'
          href='https://cdn.jsdelivr.net/npm/swiper@8/swiper-bundle.min.css'
        />
        <link rel="apple-touch-icon" sizes="57x57" href="/favicon.ico" />
        <link rel="apple-touch-icon" sizes="60x60" href="/favicon.ico" />
        <link rel="apple-touch-icon" sizes="72x72" href="/favicon.ico" />
        <link rel="apple-touch-icon" sizes="76x76" href="/favicon.ico" />
        <link rel="apple-touch-icon" sizes="114x114" href="/favicon.ico" />
        <link rel="apple-touch-icon" sizes="120x120" href="/favicon.ico" />
        <link rel="apple-touch-icon" sizes="144x144" href="/favicon.ico" />
        <link rel="apple-touch-icon" sizes="152x152" href="/favicon.ico" />
        <link rel="apple-touch-icon" sizes="180x180" href="/favicon.ico" />

        <link rel="icon" type="image/png" href="/favicon.ico" sizes="192x192" />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <meta name="theme-color" content="#000000" />
          <meta
            name="description"
            content="Homepage of Momoko Wakabashi"
          />
          <link rel="icon" href="/favicon.ico" />
          <link rel="manifest" href="/manifest.json" />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
      <Footer />
    </Html>
  );
}
