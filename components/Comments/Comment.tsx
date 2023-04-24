import { useCallback, useContext, useState } from 'react';
import dynamic from 'next/dynamic';
import NextLink from 'next/link';
import { ButtonGroup, Flex, IconButton, Link, Text } from '@chakra-ui/react';

import { AuthContext } from '@/context/AuthContext';
import { CommentType } from '@/services/types';
import DeleteIcon from '@/components/Icons/DeleteIcon';
import { DeviceContext } from '@/context/DeviceContext';
import { parseDate } from '@/services/utils/date';
import UserAvatar from '@/components/UserInfo/Avatars/UserAvatar';
import useActionConfirmation from '@/hooks/useActionConfirmation';

const CrossIcon = dynamic(() => import('@/components/Icons/CrossIcon'));
const TickIcon = dynamic(() => import('@/components/Icons/TickIcon'));

function Comment({ comment }: { comment: CommentType }) {
  const [removing, setRemoving] = useState(false);

  const [user] = useContext(AuthContext);
  const { isMobile } = useContext(DeviceContext);
  const { showConfirmation, toggleConfirmation } = useActionConfirmation();

  const handleDelete = useCallback(
    async (
      e:
        | React.MouseEvent<HTMLButtonElement>
        | React.TouchEvent<HTMLButtonElement>
    ) => {
      e.preventDefault();
      if (removing) return;
      if (user?.id !== comment.author.id) return;

      setRemoving(true);
      try {
        const supabase = (await import('@/services/supabase/supabase')).default;

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
        toggleConfirmation();
      }
    },
    [comment.id, comment.author.id, removing, user?.id, toggleConfirmation]
  );

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
            <Text as="time" fontSize="xs" color="text-secondary">
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
            icon={<DeleteIcon boxSize={isMobile ? 5 : undefined} />}
            colorScheme="red"
            isDisabled={showConfirmation}
            size={isMobile ? 'md' : 'sm'}
            variant="outline"
            onClick={toggleConfirmation}
            px={2}
          />
        )}
      {!comment.deleted &&
        showConfirmation &&
        user?.id === comment.author.id && (
          <ButtonGroup variant="outline">
            <IconButton
              aria-label="Confirm deletion"
              icon={<TickIcon boxSize={isMobile ? 6 : undefined} />}
              colorScheme="red"
              isLoading={removing}
              size={isMobile ? 'md' : 'sm'}
              onClick={handleDelete}
            />
            <IconButton
              aria-label="Cancel deletion"
              icon={<CrossIcon boxSize={isMobile ? 6 : undefined} />}
              colorScheme="green"
              isDisabled={removing}
              size={isMobile ? 'md' : 'sm'}
              onClick={toggleConfirmation}
            />
          </ButtonGroup>
        )}
    </Flex>
  );
}

export default Comment;
