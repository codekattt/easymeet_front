import { Global, ThemeProvider } from '@emotion/react';
import type { AppProps } from 'next/app';
import { theme } from '../commons/styles/theme';
import { globalStyles } from '../commons/styles/globalStyles';
import Layout from '../components/commons/layout';
import Head from 'next/head';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>Easy Meet | 이지밋</title>
        <meta
          name="description"
          content="세상에서 가장 쉬운 모임시간 잡기! 이지밋으로 빠르고 간편하게 팀플, 모임시간을 조정하세요."
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta property="og:title" content="Easy Meet | 이지밋" />
        <meta
          property="og:description"
          content="세상에서 가장 쉬운 모임시간 잡기! Easy Meet으로 간편하게 모임시간을 조정하세요."
        />
        <meta property="og:image" content="/images/logos/easymeet_logo.png" />
        <meta property="og:url" content="페이지 URL" />
        <meta property="og:type" content="website" />
        <meta
          name="keywords"
          content="Easy Meet, 이지밋, 모임시간, 팀플, 시간잡기, when2meet, 웬투밋, 모임 조율"
        />
        <meta name="author" content="Easy Meet" />
      </Head>
      <ThemeProvider theme={theme}>
        <Global styles={globalStyles} />
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </ThemeProvider>
    </>
  );
}
