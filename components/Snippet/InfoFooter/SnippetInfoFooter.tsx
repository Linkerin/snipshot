import NextLink from 'next/link';
import { Flex, Link, Stack, Text } from '@chakra-ui/react';

import { parseDate } from '@/services/utils/date';
import { SnippetType } from '@/services/types';

interface SnippetInfoFooterProps {
  author: SnippetType['author'];
  created: SnippetType['created'];
  children: React.ReactNode | React.ReactNode[];
}

function SnippetInfoFooter({
  author,
  created,
  children
}: SnippetInfoFooterProps) {
  return (
    <Stack as="footer" ml={2} mb={2} mt={1} spacing={0.5}>
      <Flex
        direction="row"
        align="center"
        wrap="wrap-reverse"
        justifyContent="space-between"
      >
        {children}
      </Flex>
      <Stack direction="row" spacing={2} alignItems="flex-end">
        <Text
          fontSize="sm"
          sx={{ fontWeight: author?.name && 'bold' }}
          color="text-secondary"
        >
          {author?.name ? (
            <Link
              as={NextLink}
              aria-label={`To ${author?.name} profile page`}
              href={`/users/${author?.name}`}
              prefetch={false}
            >
              {author?.name}
            </Link>
          ) : (
            'anonymous'
          )}
        </Text>
        <Text
          as="time"
          aria-label="Snippet creation date"
          fontSize="xs"
          color="text-secondary"
          lineHeight="21px"
        >
          {parseDate(created) ?? ''}
        </Text>
      </Stack>
    </Stack>
  );
}

export default SnippetInfoFooter;
