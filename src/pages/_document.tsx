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
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
      <Footer />
    </Html>
  );
}
