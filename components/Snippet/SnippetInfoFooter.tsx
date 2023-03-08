import NextLink from 'next/link';
import {
  Stack,
  Link,
  Text,
  Tag,
  TagLabel,
  TagLeftIcon
} from '@chakra-ui/react';

import CheckedIcon from '@/components/Icons/CheckedIcon';
import { parseDate } from '@/services/date';
import { SnippetType } from '@/services/types';

type SnippetInfoFooterProps = Pick<
  SnippetType,
  'author' | 'created' | 'rating' | 'verified'
>;

function SnippetInfoFooter({
  author,
  created,
  rating,
  verified
}: SnippetInfoFooterProps) {
  return (
    <Stack ml={2} mt={2}>
      <Stack
        direction="row"
        align="center"
        wrap="wrap-reverse"
        justifyContent="space-between"
      >
        {/* <Rating id={rating.id} rating={rating.rating} /> */}
        {verified && (
          <Tag
            variant="outline"
            size="sm"
            borderRadius="full"
            _hover={{ bg: 'none' }}
            pl={1}
            pr={1.5}
            py={1}
          >
            <TagLeftIcon as={CheckedIcon} boxSize={4} mr={1} />
            <TagLabel cursor="default">Verified</TagLabel>
          </Tag>
        )}
      </Stack>
      <Stack direction="row" spacing={2}>
        <Text fontSize="xs" sx={{ fontWeight: author?.name && 'bold' }}>
          {author?.name ? (
            <Link as={NextLink} href={`/users/${author?.name}`}>
              {author?.name}
            </Link>
          ) : (
            'anonymous'
          )}
        </Text>
        <Text fontSize="xs">{parseDate(created) ?? ''}</Text>
      </Stack>
    </Stack>
  );
}

export default SnippetInfoFooter;
