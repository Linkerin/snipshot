import type { AppProps } from 'next/app';

import { AuthProvider } from '@/context/AuthContext';
import ChakraProvider from '@/context/ChakraContext';
import { DeviceProvider } from '@/context/DeviceContext';

import Layout from '@/components/Layout';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider>
      <AuthProvider>
        <DeviceProvider device={pageProps.device}>
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </DeviceProvider>
      </AuthProvider>
    </ChakraProvider>
  );
}
