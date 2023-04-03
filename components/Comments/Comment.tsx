import { useContext, useState } from 'react';
import NextLink from 'next/link';
import { Flex, IconButton, Link, Text } from '@chakra-ui/react';

import { AuthContext } from '@/context/AuthContext';
import { CommentType } from '@/services/types';
import CrossIcon from '@/components/Icons/CrossIcon';
import DeleteIcon from '@/components/Icons/DeleteIcon';
import { parseDate } from '@/services/date';
import TickIcon from '@/components/Icons/TickIcon';
import UserAvatar from '@/components/UserInfo/Avatars/UserAvatar';

function Comment({ comment }: { comment: CommentType }) {
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [removing, setRemoving] = useState(false);

  const user = useContext(AuthContext);

  const handleDelete = async (
    e: React.MouseEvent<HTMLButtonElement> | React.TouchEvent<HTMLButtonElement>
  ) => {
    e.preventDefault();
    if (removing) return;
    if (user?.id !== comment.author.id) return;

    setRemoving(true);
    try {
      const supabase = (await import('@/services/supabase')).default;

      const { data, error } = await supabase
        .from('comments')
        .update({ deleted: true, updated: new Date() })
        .eq('id', comment.id);
      if (error) throw error;
    } catch (err) {
      console.error(`Error while deleting comment ID ${comment.id}`);
      console.error(err);
    } finally {
      setRemoving(false);
      setShowConfirmation(false);
    }
  };

  return (
    <Flex alignItems="center" justifyContent="space-between">
      <Flex alignItems="center" gap={2}>
        <Link as={NextLink} href={`/users/${comment.author.name}`}>
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
            <Text fontSize="xs" color="text-secondary">
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
            <Text fontSize="sm" fontStyle="italic" color="text-secondary">
              This comment was removed
            </Text>
          ) : (
            <Text>{comment.comment}</Text>
          )}
        </Flex>
      </Flex>

      {!comment.deleted &&
        !showConfirmation &&
        user?.id === comment.author.id && (
          <IconButton
            aria-label="Delete comment"
            icon={<DeleteIcon />}
            colorScheme="red"
            isDisabled={showConfirmation}
            size="sm"
            variant="outline"
            onClick={e => setShowConfirmation(true)}
          />
        )}
      {!comment.deleted &&
        showConfirmation &&
        user?.id === comment.author.id && (
          <Flex gap={2}>
            <IconButton
              aria-label="Confirm deletion"
              icon={<TickIcon />}
              colorScheme="red"
              isLoading={removing}
              size="sm"
              variant="outline"
              onClick={handleDelete}
            />
            <IconButton
              aria-label="Cancel deletion"
              icon={<CrossIcon />}
              colorScheme="green"
              isLoading={removing}
              size="sm"
              variant="outline"
              onClick={e => setShowConfirmation(false)}
            />
          </Flex>
        )}
    </Flex>
  );
}

export default Comment;
