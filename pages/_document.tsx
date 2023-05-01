import { Html, Head, Main, NextScript } from 'next/document';
import { ColorModeScript } from '@chakra-ui/react';

import Favicon from '@/components/Meta/Favicon';
import theme from '@/services/theme/theme';

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <Favicon />
      </Head>
      <body>
        <ColorModeScript initialColorMode={theme.config.initialColorMode} />
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
