import {
  Flex,
  Heading,
  Highlight,
  SystemStyleObject,
  Text
} from '@chakra-ui/react';

const accentWordsStyles: SystemStyleObject = {
  px: '2',
  py: '1',
  borderRadius: '10px',
  bg: 'primary',
  fontWeight: 'medium',
  color: 'chakra-body-bg'
};

function SnipshotDescription() {
  return (
    <Flex
      flexDirection="column"
      alignItems="flex-start"
      gap={6}
      justifyContent="flex-start"
    >
      <Heading size="3xl" textAlign="left" mb={5}>
        <Highlight query="snipshot" styles={{ color: 'primary' }}>
          Welcome to snipshot!
        </Highlight>
      </Heading>

      <Text align="left" lineHeight="8" fontSize="xl">
        <Highlight query={['store', 'share']} styles={accentWordsStyles}>
          We are an application for developers to store and share their favorite
          code snippets with others.
        </Highlight>
      </Text>

      <Text align="left" lineHeight="8" fontSize="xl">
        <Highlight query="snipshot" styles={{ color: 'primary' }}>
          With snipshot your useful one-liners won&apos;t be forgotten.
        </Highlight>{' '}
        Futhermore, you can share your experience and ideas with others.{' '}
        <Highlight query="inspiration" styles={accentWordsStyles}>
          Sounds like a source of inspiration, doesn&apos;t it?
        </Highlight>
      </Text>

      <Text align="left" lineHeight="8" fontSize="xl">
        <Highlight query="now" styles={accentWordsStyles}>
          Our platform is designed to be user-friendly and intuitive. Start
          using it now!
        </Highlight>
      </Text>
    </Flex>
  );
}

export default SnipshotDescription;
