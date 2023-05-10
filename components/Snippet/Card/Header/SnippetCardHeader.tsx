import NextLink from 'next/link';
import {
  Box,
  CardHeader,
  Divider,
  Flex,
  Heading,
  LinkBox,
  LinkOverlay,
  useColorModeValue
} from '@chakra-ui/react';

import { SnippetType } from '@/services/types';

function SnippetHeadCircle({ color }: { color: string }) {
  return <Box bg={color} borderRadius="50%" w="0.5rem" h="0.5rem" />;
}

interface SnippetCardHeaderProps {
  lang: SnippetType['lang'];
  title: SnippetType['title'];
  slug?: SnippetType['slug'];
  children?: React.ReactNode;
}

function SnippetCardHeader({
  lang,
  slug,
  title,
  children
}: SnippetCardHeaderProps) {
  const headingDividerColor = useColorModeValue('gray.300', 'chakra-body-bg');

  const escapedLang = lang ? encodeURIComponent(lang) : '';

  return (
    <>
      <CardHeader as="header" py={1.5} pr={1}>
        <Flex gap={5} alignItems="center" h={4} w="100%">
          <LinkBox as={Flex} alignItems="center" gap={1} w="100%">
            <SnippetHeadCircle color="#f18549" />
            <SnippetHeadCircle color="#ffe600" />
            <SnippetHeadCircle color="#0ad787" />
            <Heading as="h2" fontSize="sm" noOfLines={1} pl={1}>
              {slug ? (
                <LinkOverlay
                  as={NextLink}
                  aria-label={`Navigate to ${title} snippet page`}
                  href={`/snippets/${escapedLang}/${slug}/`}
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
          {children}
        </Flex>
      </CardHeader>
      <Divider color={headingDividerColor} />
    </>
  );
}

export default SnippetCardHeader;
