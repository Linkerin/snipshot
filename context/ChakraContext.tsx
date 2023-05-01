import { ChakraProvider, ToastProviderProps } from '@chakra-ui/react';
import theme from '@/services/theme/theme';

const toastOptions: ToastProviderProps = {
  defaultOptions: {
    position: 'bottom-left',
    isClosable: true,
    variant: 'subtle'
  }
};

interface ChakraProps {
  children: React.ReactNode | React.ReactNode[];
}

function Chakra({ children }: ChakraProps) {
  return (
    <ChakraProvider theme={theme} toastOptions={toastOptions}>
      {children}
    </ChakraProvider>
  );
}

export default Chakra;
