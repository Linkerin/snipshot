import { Center, Text } from '@chakra-ui/react';

import CustomSpinner from '@/components/CustomSpinner';

function LoadingInfo() {
  return (
    <Center h="100%" flexDirection="column" gap={5}>
      <CustomSpinner h="6rem" w="6rem" thickness="0.5rem" speed="0.8s" />
      <Text fontSize="xl" letterSpacing="wide">
        Loading your snippet...
      </Text>
    </Center>
  );
}

export default LoadingInfo;
