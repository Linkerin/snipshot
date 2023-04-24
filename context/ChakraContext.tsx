import {
  ChakraProvider,
  cookieStorageManagerSSR,
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

function Chakra({ children, cookies }: ChakraProps) {
  return (
    <ChakraProvider
      theme={theme}
      toastOptions={toastOptions}
      colorModeManager={cookieStorageManagerSSR(cookies ?? '')}
    >
      {children}
    </ChakraProvider>
  );
}

export default Chakra;
