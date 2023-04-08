import NextLink from 'next/link';
import {
  Heading,
  Highlight,
  Link,
  ListItem,
  Text,
  Stack,
  SystemStyleObject,
  UnorderedList
} from '@chakra-ui/react';

import Meta from '@/components/Meta/Meta';

const accentWordsStyles: SystemStyleObject = {
  px: '2',
  py: '1',
  borderRadius: '10px',
  bg: 'primary',
  fontWeight: 'medium',
  color: 'chakra-body-bg'
};

export function AboutPage() {
  return (
    <>
      <Meta
        title="About &#183; snipshot"
        description="Page about the snipshot project"
        keywords="about, information, snipshot"
      />
      <Stack
        as="article"
        direction="column"
        align="left"
        spacing={6}
        w={{ base: '100%', md: '75%', xl: '50%' }}
        my={4}
        px={6}
      >
        <Heading size="3xl" textAlign="left" mb={5}>
          <Highlight query="snipshot" styles={{ color: 'primary' }}>
            Welcome to snipshot!
          </Highlight>
        </Heading>

        <Text align="left" lineHeight="8" fontSize="xl">
          <Highlight query={['store', 'share']} styles={accentWordsStyles}>
            We are an application for developers to store and share their
            favorite code snippets with others.
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
        <Stack direction="column" spacing={1} fontSize="sm" pt={10}>
          <Text align="left" color="text-secondary">
            We would like to thank the following projects for their assets:
          </Text>
          <UnorderedList color="text-secondary" pl={6}>
            <ListItem>
              <Link
                as={NextLink}
                href="https://chakra-ui.com"
                prefetch={false}
                rel="noreferrer"
                fontWeight="bold"
              >
                Chakra UI
              </Link>
            </ListItem>
            <ListItem>
              Unicons by{' '}
              <Link
                as={NextLink}
                href="https://iconscout.com/"
                prefetch={false}
                rel="noreferrer"
                fontWeight="bold"
              >
                IconScout
              </Link>
            </ListItem>
            <ListItem>
              <Link
                as={NextLink}
                href="https://devicon.dev"
                prefetch={false}
                rel="noreferrer"
                fontWeight="bold"
              >
                Devicon
              </Link>
            </ListItem>
            <ListItem>
              Cute Sloth created by{' '}
              <Link
                as={NextLink}
                href="https://www.freepik.com/author/catalyststuff"
                prefetch={false}
                rel="noreferrer"
                fontWeight="bold"
              >
                catalyststuff
              </Link>
              {' on '}
              <Link
                as={NextLink}
                href="https://www.freepik.com/"
                prefetch={false}
                rel="noreferrer"
                fontWeight="bold"
              >
                Freepik
              </Link>
            </ListItem>
          </UnorderedList>
        </Stack>
      </Stack>
    </>
  );
}

export default AboutPage;
