import { Heading, HeadingProps } from '@chakra-ui/react';

interface UsernameProps {
  fontSize?: HeadingProps['fontSize'];
  username?: string;
}

function Username({ username, fontSize = '1.6rem' }: UsernameProps) {
  return (
    <Heading
      as="h2"
      fontSize={fontSize}
      fontWeight="medium"
      mt={1}
      cursor="default"
    >
      {username ?? 'Hello, Guest!'}
    </Heading>
  );
}

export default Username;
