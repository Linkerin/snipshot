import '@/styles/globals.css';
import '@/styles/snippetCode.css';
import type { AppProps } from 'next/app';

import { ChakraProvider } from '@chakra-ui/react';

import Layout from '@/components/Layout';
import theme from '@/services/theme/theme';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider theme={theme}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </ChakraProvider>
  );
}
