import { useContext } from 'react';
import NextLink from 'next/link';
import {
  Link,
  Stack,
  Text,
  Tag,
  TagLabel,
  TagLeftIcon
} from '@chakra-ui/react';

import CheckedIcon from '@/components/Icons/CheckedIcon';
import { parseDate } from '@/services/date';
import Rating from './Rating';
import SnippetContext from '@/context/SnippetContext';

function SnippetInfoFooter() {
  const { author, created, rating, verified } = useContext(SnippetContext);

  return (
    <Stack ml={2} mb={2} mt={1} spacing={0.5}>
      <Stack
        direction="row"
        align="center"
        wrap="wrap-reverse"
        justifyContent="space-between"
      >
        <Rating id={rating.id} rating={rating.rating} />
        {verified && (
          <Tag
            variant="outline"
            size="sm"
            border="1px"
            borderColor={'primary'}
            borderRadius="full"
            boxShadow="none"
            _hover={{ bg: 'none' }}
            pl={1}
            pr={1.5}
            py={1}
          >
            <TagLeftIcon as={CheckedIcon} boxSize={4} color="primary" mr={1} />
            <TagLabel color="primary" cursor="default">
              Verified
            </TagLabel>
          </Tag>
        )}
      </Stack>
      <Stack direction="row" spacing={2} alignItems="flex-end">
        <Text
          fontSize="sm"
          sx={{ fontWeight: author?.name && 'bold' }}
          color="text-secondary"
        >
          {author?.name ? (
            <Link
              as={NextLink}
              href={`/users/${author?.name}`}
              prefetch={false}
            >
              {author?.name}
            </Link>
          ) : (
            'anonymous'
          )}
        </Text>
        <Text fontSize="xs" color="text-secondary" lineHeight="21px">
          {parseDate(created) ?? ''}
        </Text>
      </Stack>
    </Stack>
  );
}

export default SnippetInfoFooter;
