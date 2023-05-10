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
import LegalDisclaimer from '@/components/Common/LegalDisclaimer';

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
        title="About · snipshot"
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
        <LegalDisclaimer pt={6} />
        <Stack direction="column" spacing={1} fontSize="sm">
          <Text align="left" color="text-secondary">
            We would like to thank the following projects for their assets:
          </Text>
          <UnorderedList color="text-secondary" pl={6}>
            <ListItem>
              <Link
                as={NextLink}
                aria-label="Navigate to external Chakra-UI.com page"
                href="https://chakra-ui.com"
                prefetch={false}
                rel="noreferrer"
                fontWeight="bold"
                isExternal
              >
                Chakra UI
              </Link>
            </ListItem>
            <ListItem>
              Unicons by{' '}
              <Link
                as={NextLink}
                aria-label="Navigate to external IconScout.com page"
                href="https://iconscout.com/"
                prefetch={false}
                rel="noreferrer"
                fontWeight="bold"
                isExternal
              >
                IconScout
              </Link>
            </ListItem>
            <ListItem>
              <Link
                as={NextLink}
                aria-label="Navigate to external DevIcon.dev page"
                href="https://devicon.dev"
                prefetch={false}
                rel="noreferrer"
                fontWeight="bold"
                isExternal
              >
                Devicon
              </Link>
            </ListItem>
            <ListItem>
              Cute pictures created by{' '}
              <Link
                as={NextLink}
                aria-label="Navigate to external catalyststuff profile page on Freepik"
                href="https://www.freepik.com/author/catalyststuff"
                prefetch={false}
                rel="noreferrer"
                fontWeight="bold"
                isExternal
              >
                catalyststuff
              </Link>
              {' on '}
              <Link
                as={NextLink}
                aria-label="Navigate to external Freepik.com page"
                href="https://www.freepik.com/"
                prefetch={false}
                rel="noreferrer"
                fontWeight="bold"
                isExternal
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
