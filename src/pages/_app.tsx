import { Global, ThemeProvider } from '@emotion/react';
import type { AppProps } from 'next/app';
import { theme } from '../commons/styles/theme';
import { globalStyles } from '../commons/styles/globalStyles';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider theme={theme}>
      <Global styles={globalStyles} />
      <Component {...pageProps} />
    </ThemeProvider>
  );
}
