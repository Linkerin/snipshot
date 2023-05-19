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

function Alerts({ error }: { error: string }) {
  const [user] = useContext(AuthContext);

  return (
    <VStack spacing={2} mb={3}>
      {!user?.id && (
        <Alert
          aria-label="Log in to be a snippet author"
          status="info"
          py={2}
          px={3}
          variant="info"
        >
          <AlertIcon aria-label="Info icon" boxSize={4} />
          <AlertDescription fontSize="sm">
            Hey, how about{' '}
            <Link
              as={NextLink}
              aria-label="To login page"
              href="/login"
              color="primary"
            >
              logging in
            </Link>{' '}
            to be the author of your snippet? 😊
          </AlertDescription>
        </Alert>
      )}
      {!!error && (
        <Alert aria-label="Error" status="error" py={2} px={3}>
          <AlertIcon aria-label="Error icon" boxSize={4} />
          <AlertDescription fontSize="sm">{error}</AlertDescription>
        </Alert>
      )}
    </VStack>
  );
}

export default Alerts;
