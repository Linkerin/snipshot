import { useContext } from 'react';
import NextLink from 'next/link';
import {
  Alert,
  AlertDescription,
  AlertIcon,
  Link,
  VStack
} from '@chakra-ui/react';

import { AuthContext } from '@/context/AuthContext';

function Alerts({ error }: { error: boolean }) {
  const user = useContext(AuthContext);

  return (
    <VStack spacing={2} mb={3}>
      {!user?.id && (
        <Alert status="info" py={2} px={3}>
          <AlertIcon boxSize={4} />
          <AlertDescription fontSize="sm">
            Hey, how about{' '}
            <Link as={NextLink} href="/login" color="red">
              logging in
            </Link>{' '}
            to be the author of your snippet? 😊
          </AlertDescription>
        </Alert>
      )}
      {error && (
        <Alert status="error" py={2} px={3}>
          <AlertIcon boxSize={4} />
          <AlertDescription fontSize="sm">
            Sorry, something went wrong. Please, try again in a few minutes
          </AlertDescription>
        </Alert>
      )}
    </VStack>
  );
}

export default Alerts;
