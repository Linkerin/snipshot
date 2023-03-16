import { Heading } from '@chakra-ui/react';

function Username({ username }: { username?: string }) {
  return (
    <Heading
      as="h2"
      fontSize="1.6rem"
      fontWeight="medium"
      mt={1}
      cursor="default"
    >
      {username ?? 'Hello, Guest!'}
    </Heading>
  );
}

export default Username;
