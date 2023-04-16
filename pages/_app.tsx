import type { AppProps } from 'next/app';

import { AuthProvider } from '@/context/AuthContext';
import { Chakra } from '@/components/Chakra';
import { DeviceProvider } from '@/context/DeviceContext';

import Layout from '@/components/Layout';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Chakra>
      <AuthProvider>
        <DeviceProvider device={pageProps.device}>
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </DeviceProvider>
      </AuthProvider>
    </Chakra>
  );
}
