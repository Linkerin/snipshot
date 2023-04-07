import { useCallback, useContext, useEffect, useState } from 'react';
import { log } from 'next-axiom';
import {
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Divider,
  Flex,
  Skeleton,
  SkeletonText,
  Text
} from '@chakra-ui/react';
import type { RealtimeChannel, SupabaseClient } from '@supabase/supabase-js';

import AddComment from './AddComment';
import { AuthContext } from '@/context/AuthContext';
import Comment from './Comment';
import CommentsIcon from '@/components/Icons/CommentsIcon';
import { CommentType } from '@/services/types';
import NoComments from './NoComments';
import { SnippetIdContext } from '@/components/Pages/SnippetPage';

type LoadStatuses = 'idle' | 'loading' | 'finished';

function CommentsContainer() {
  const [commentsLoadStatus, setCommentsLoadStatus] =
    useState<LoadStatuses>('idle');
  const [comments, setComments] = useState<CommentType[]>([]);

  const user = useContext(AuthContext);
  const snippetId = useContext(SnippetIdContext);

  // Callback for a supabase subscription
  const handleCommentInsert = useCallback(async (payload: any) => {
    if (payload.eventType !== 'INSERT') return;

    const addedComment = payload.new;
    try {
      const supabase = (await import('@/services/supabase/supabase')).default;
      const { data: userInfo, error } = await supabase
        .from('profiles')
        .select('name, avatar')
        .eq('id', addedComment.user_id)
        .limit(1)
        .single();
      if (error) throw error;
      if (!userInfo) return;

      setComments(prevState => {
        const newComment: CommentType = {
          id: addedComment.id,
          comment: addedComment.comment,
          parent: addedComment.parent,
          created: addedComment.created,
          deleted: addedComment.deleted,
          snippetId: addedComment.snippet_id,
          author: {
            id: addedComment.user_id,
            name: userInfo.name,
            avatar: userInfo.avatar
          }
        };

        return [...prevState, newComment];
      });
    } catch (err) {
      console.error(err);
    }
  }, []);

  // Callback for a supabase subscription
  const handleCommentDeleteUpdate = useCallback((payload: any) => {
    if (payload.eventType !== 'UPDATE') return;

    const { id, deleted } = payload.new;
    if (!id || !deleted) return;

    setComments(prevState => {
      const newState = prevState.map(comment => {
        if (comment.id === id) {
          comment.deleted = deleted;
        }
        return comment;
      });

      return newState;
    });
  }, []);

  // Fetch all comments
  useEffect(() => {
    setCommentsLoadStatus('loading');
    let controller = new AbortController();

    const fetchComments = async () => {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API}/comments?snippetId=${snippetId}`,
          { signal: controller.signal }
        );
        const data = await res.json();

        if (data?.comments?.length > 0) {
          setComments(data.comments);
        }
      } catch (err) {
        log.error('Error while fetching comments', { err, snippetId });
      } finally {
        setCommentsLoadStatus('finished');
      }
    };

    fetchComments();

    return () => controller.abort();
  }, [snippetId]);

  useEffect(() => {
    let channel: RealtimeChannel;
    let supabase: SupabaseClient;

    const loadChannel = async () => {
      supabase = (await import('@/services/supabase/supabase')).default;

      channel = supabase
        .channel('any')
        .on(
          'postgres_changes',
          { event: 'INSERT', schema: 'public', table: 'comments' },
          handleCommentInsert
        )
        .on(
          'postgres_changes',
          { event: 'UPDATE', schema: 'public', table: 'comments' },
          handleCommentDeleteUpdate
        )
        .subscribe();
    };

    loadChannel();

    return () => {
      supabase?.removeChannel(channel);
    };
  }, [handleCommentInsert, handleCommentDeleteUpdate]);

  return (
    <Card
      variant="outline"
      as="section"
      bgColor="chakra-body-bg"
      maxHeight={{ base: '100%', lg: '85vh' }}
    >
      <CardHeader px={3} pt={2} pb={2}>
        <Flex alignItems="center" gap={1}>
          <CommentsIcon boxSize={5} />
          <Text fontSize="lg">
            {commentsLoadStatus !== 'finished' && (
              <Skeleton as="span" speed={2}>
                00
              </Skeleton>
            )}
            {commentsLoadStatus === 'finished' && comments.length} comments
          </Text>
        </Flex>
        <Divider mt={2} />
      </CardHeader>
      <CardBody
        as={Flex}
        flexDirection="column"
        gap={2}
        px={3}
        py={1}
        overflowY="scroll"
      >
        {commentsLoadStatus !== 'finished' && (
          <SkeletonText
            speed={2}
            noOfLines={3}
            spacing="3"
            skeletonHeight="3"
            mb={1}
          />
        )}
        {commentsLoadStatus === 'finished' &&
          (comments.length > 0 ? (
            comments.map(comment => (
              <Comment key={comment.id} comment={comment} />
            ))
          ) : (
            <NoComments />
          ))}
      </CardBody>
      {user?.id && (
        <CardFooter as={Flex} flexDirection="column" gap={3} px={3} py={2}>
          <Divider />
          <AddComment />
        </CardFooter>
      )}
    </Card>
  );
}

export default CommentsContainer;
