import NextLink from 'next/link';
import { Flex, Link, Text } from '@chakra-ui/react';

import { CommentType } from '@/services/types';
import { parseDate } from '@/services/date';
import UserAvatar from '@/components/UserInfo/Avatars/UserAvatar';

function Comment({ comment }: { comment: CommentType }) {
  return (
    <Flex alignItems="flex-start" gap={2}>
      <Link as={NextLink} href={`/users/${comment.author.name}`} pt={1}>
        <UserAvatar
          avatar={comment.author.avatar}
          username={comment.author.name}
          size="xs"
          disabled={comment.deleted}
          noBorder
        />
      </Link>
      <Flex direction="column" justifyContent="flex-start">
        <Flex alignItems="flex-end" gap={2}>
          <Text fontSize="sm" fontWeight="bold">
            <Link as={NextLink} href={`/users/${comment.author.name}`}>
              {comment.author.name}
            </Link>
          </Text>
          <Text fontSize="xs">
            {parseDate(comment.created, {
              year: 'numeric',
              month: 'numeric',
              day: 'numeric',
              hour: '2-digit',
              minute: '2-digit'
            })}
          </Text>
        </Flex>
        {comment.deleted ? (
          <Text fontSize="sm" fontStyle="italic">
            This comment was removed
          </Text>
        ) : (
          <Text>{comment.comment}</Text>
        )}
      </Flex>
    </Flex>
  );
}

export default Comment;
