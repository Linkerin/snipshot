import { useContext } from 'react';
import NextLink from 'next/link';
import { Box, Flex, Heading, LinkBox, LinkOverlay } from '@chakra-ui/react';

import SnippetBarOptions from './SnippetBarOptions';
import SnippetContext from '@/context/SnippetContext';

function SnippetHeadCircle({ color }: { color: string }) {
  return <Box bg={color} borderRadius="50%" w="0.5rem" h="0.5rem" />;
}

function SnippetBar() {
  const { lang, slug, title } = useContext(SnippetContext);

  return (
    <Flex as="header" gap={5} alignItems="center" h={4} w="100%">
      <LinkBox as={Flex} alignItems="center" gap={1} w="100%">
        <SnippetHeadCircle color="#f18549" />
        <SnippetHeadCircle color="#ffe600" />
        <SnippetHeadCircle color="#0ad787" />
        <Heading as="h2" fontSize="sm" noOfLines={1} pl={1}>
          {slug ? (
            <LinkOverlay
              as={NextLink}
              href={`/snippets/${lang}/${slug}/`}
              prefetch={false}
              _hover={{ color: 'primary' }}
            >
              {title}
            </LinkOverlay>
          ) : (
            title
          )}
        </Heading>
      </LinkBox>
      <SnippetBarOptions />
    </Flex>
  );
}

export default SnippetBar;
