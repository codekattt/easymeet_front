import { Html, Head, Main, NextScript } from 'next/document';

export default function Document() {
  return (
    <Html lang="ko">
      <Head>
        <meta charSet="UTF-8" />
        <link rel="icon" href="/images/icon/brand_favicon.webp" />
        <meta name="theme-color" content="#000000" />
        <meta
          name="description"
          content="Easy Meet - 세상에서 가장 쉬운 모임시간 잡기!"
        />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
