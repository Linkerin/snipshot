import { Box, BoxProps } from '@chakra-ui/react';

function PageContentWrapper({ children, ...props }: BoxProps) {
  return (
    <Box id="container" pt={3} px={3} {...props}>
      {children}
    </Box>
  );
}

export default PageContentWrapper;
