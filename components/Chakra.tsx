import { GetServerSideProps } from 'next';
import {
  ChakraBaseProvider,
  cookieStorageManagerSSR,
  localStorageManager,
  ToastProviderProps
} from '@chakra-ui/react';
import theme from '@/services/theme/theme';

const toastOptions: ToastProviderProps = {
  defaultOptions: {
    position: 'bottom-left',
    isClosable: true,
    variant: 'subtle'
  }
};

interface ChakraProps {
  cookies?: string;
  children: React.ReactNode | React.ReactNode[];
}

export function Chakra({ cookies, children }: ChakraProps) {
  const colorModeManager =
    typeof cookies === 'string'
      ? cookieStorageManagerSSR(cookies)
      : localStorageManager;

  return (
    <ChakraBaseProvider
      colorModeManager={colorModeManager}
      theme={theme}
      toastOptions={toastOptions}
    >
      {children}
    </ChakraBaseProvider>
  );
}

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
  return {
    props: {
      cookies: req.headers.cookie ?? ''
    }
  };
};
