import '@/styles/globals.css';
import '@/styles/snippetCode.css';
import type { AppProps } from 'next/app';

import { AuthProvider } from '@/context/AuthContext';
import { Chakra } from '@/components/Chakra';
import { DeviceProvider } from '@/context/DeviceContext';

import Layout from '@/components/Layout';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Chakra cookies={pageProps.cookies}>
      <AuthProvider>
        <DeviceProvider>
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </DeviceProvider>
      </AuthProvider>
    </Chakra>
  );
}
