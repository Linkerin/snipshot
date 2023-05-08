import { Button, Flex, Heading, Img, Link, Text, Show } from '@chakra-ui/react';

function Custom404() {
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
        404
      </Heading>
      <Flex
        flexDirection="row"
        alignItems="flex-start"
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
            Everything is rough in the Unknown Regions
          </Heading>
          <Text>
            You are trying to find something that is beyond our reach. Maybe
            someday.
          </Text>
          <Button
            as={Link}
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
            src="/images/LeiaFox.webp"
            alt="Cartoon fox as Princess Leia"
            height="auto"
            width={{ base: '42vw', sm: '34vw', md: '28vw', lg: '20vw' }}
          />
        </Show>
      </Flex>
    </Flex>
  );
}

export default Custom404;
