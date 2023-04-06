import { ChakraBaseProvider, ToastProviderProps } from '@chakra-ui/react';
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

export function Chakra({ children }: ChakraProps) {
  return (
    <ChakraBaseProvider theme={theme} toastOptions={toastOptions}>
      {children}
    </ChakraBaseProvider>
  );
}
