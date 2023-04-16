import { useContext } from 'react';
import dynamic from 'next/dynamic';
import NextLink from 'next/link';
import { Link, Stack, Text } from '@chakra-ui/react';

import { parseDate } from '@/services/utils/date';
import Rating from './Rating';
import SnippetContext from '@/context/SnippetContext';

const VerificationTag = dynamic(() => import('./VerificationTag'));

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
        {verified && <VerificationTag />}
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
