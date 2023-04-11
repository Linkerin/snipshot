import NextLink from 'next/link';
import { Button, Flex, Heading, Img, Text, Show } from '@chakra-ui/react';

function Custom500() {
  return (
    <Flex
      flexDirection="column"
      alignItems="center"
      mt={{ base: 2, md: 5 }}
      gap={4}
    >
      <Heading
        fontSize={{ base: '7rem', md: '9rem', lg: '12rem' }}
        color="primary"
      >
        500
      </Heading>
      <Flex
        flexDirection="row"
        alignItems="center"
        justifyContent="center"
        gap={{ base: 2, md: 5 }}
      >
        <Flex
          flexDirection="column"
          w={{ base: '100%', lg: '40%', '2xl': '60%' }}
          mx={5}
          gap={4}
          alignItems="flex-start"
          justifyContent="center"
        >
          <Heading
            as="q"
            size={{ base: 'lg', lg: 'xl' }}
            fontStyle="italic"
            letterSpacing="wide"
          >
            Anything that can go wrong will go wrong
          </Heading>
          <Text>We learn from mistakes. Maybe we will even fix them.</Text>
          <Button
            as={NextLink}
            href="/"
            aria-label="Homepage"
            variant="outline"
            prefetch={false}
            alignSelf="flex-start"
            mt={4}
            size="lg"
          >
            Go to homepage
          </Button>
        </Flex>
        <Show above="sm">
          <Img
            src="/images/Repair.webp"
            alt="Astronaut and repair droid"
            height="auto"
            width={{ base: '42vw', sm: '34vw', md: '28vw', lg: '20vw' }}
          />
        </Show>
      </Flex>
    </Flex>
  );
}

export default Custom500;
