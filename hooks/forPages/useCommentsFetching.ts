import { useCallback, useEffect, useState } from 'react';
import type { RealtimeChannel, SupabaseClient } from '@supabase/supabase-js';

import { CommentType } from '@/services/types';

type LoadStatuses = 'idle' | 'loading' | 'finished';

/**
 * Hook that handles all the logic of initial comments fetching for a particular snippet
 * and creates a subscription to listen for the changes.
 * @returns An object that containes `comments` array as a state and `commentsLoadStatus`.
 * Posible values for the loading status: `'idle'`, `'loading'`, `'finished'`
 * @example
 * const { comments, commentsLoadStatus } = useCommentsFetching(snippetId);
 */
function useCommentsFetching(snippetId: string | null) {
  const [commentsLoadStatus, setCommentsLoadStatus] =
    useState<LoadStatuses>('idle');
  const [comments, setComments] = useState<CommentType[]>([]);

  // Callback for a supabase Insert subscription
  const handleCommentInsert = useCallback(
    async (payload: any) => {
      if (payload.eventType !== 'INSERT') return;
      if (payload.new.snippet_id !== snippetId) return;

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
    },
    [snippetId]
  );

  // Callback for a supabase subscription
  const handleCommentDeleteUpdate = useCallback(
    (payload: any) => {
      if (payload.eventType !== 'UPDATE') return;
      if (payload.new.snippet_id !== snippetId) return;

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
    },
    [snippetId]
  );

  // Initial fetch of all the snippet's comments
  useEffect(() => {
    setCommentsLoadStatus('loading');
    let controller = new AbortController();

    const fetchComments = async () => {
      try {
        const supabase = (await import('@/services/supabase/supabase')).default;
        const { data, error } = await supabase
          .from('comments')
          .select(
            `id,
          comment,
          parent,
          snippet_id,
          created,
          updated,
          deleted,
          profiles(
            id,
            name,
            avatar
          )`
          )
          .eq('snippet_id', snippetId)
          .abortSignal(controller.signal)
          .order('created', { ascending: true });
        if (error) throw error;
        if (data?.length > 0) {
          // Formats comment object according to the CommentType
          const comments = data.map(comment => {
            // Remove text for deleted comments
            if (comment.deleted) {
              comment.comment = '';
            }
            let authorInfo;
            if (Array.isArray(comment.profiles)) {
              authorInfo = comment.profiles[0];
            } else {
              authorInfo = comment.profiles;
            }

            const formattedComment = {
              id: comment.id,
              comment: comment.comment,
              parent: comment.parent,
              snippetId: comment.snippet_id,
              created: comment.created,
              updated: comment.updated,
              deleted: comment.deleted,
              author: {
                id: authorInfo?.id,
                name: authorInfo?.name,
                avatar: authorInfo?.avatar
              }
            };
            return formattedComment;
          });

          setComments(comments);
        }
      } catch (err) {
        const log = (await import('next-axiom')).log;
        log.error('Error while fetching comments', { err, snippetId });
      } finally {
        setCommentsLoadStatus('finished');
      }
    };

    fetchComments();

    return () => controller.abort();
  }, [snippetId]);

  // Listen for updates in comments
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

  return { commentsLoadStatus, comments };
}

export default useCommentsFetching;
