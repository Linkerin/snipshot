import { useCallback, useContext, useEffect, useState } from 'react';

import { AuthContext } from '@/context/AuthContext';
import { SnippetRatingInfoProps } from '@/services/types';

function useRatingActions({ ratingId, rating }: SnippetRatingInfoProps) {
  const [currentRating, setCurrentRating] = useState<number>(Number(rating));
  const [status, setStatus] = useState<
    'liked' | 'disliked' | 'not rated' | null
  >(null);

  const [isUpdating, setIsUpdating] = useState(false);
  const [user] = useContext(AuthContext);

  /**
   * Fetches API to make Supabase function calls.
   * Implementation with Next API is necessary due to table restrictions
   * and necessity to use Supabase service client.
   * @returns Rating number in case of success, `null` otherwise
   */
  const updateRating = useCallback(
    async (action: 'increment' | 'decrement' | 'revoke') => {
      try {
        const supabase = (await import('@/services/supabase/supabase')).default;
        const { data: sessionData, error: sessionError } =
          await supabase.auth.getSession();
        if (sessionError) throw sessionError;
        const jwt = sessionData.session?.access_token;

        const res = await fetch('/api/snippets/rating', {
          method: 'POST',
          credentials: 'same-origin',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            ratingId,
            action,
            jwt
          })
        });

        if (!res.ok) {
          const err = await res.json();
          throw new Error(err);
        }

        const data = await res.json();

        return Number(data.rating);
      } catch (err) {
        const log = (await import('next-axiom')).log;
        log.error('Error while changing rating', { err, action });
        return null;
      }
    },
    [ratingId]
  );

  const resetStateChanges = useCallback(
    (initialStatus: typeof status, initialRating: number) => {
      setStatus(initialStatus);
      setCurrentRating(initialRating);
    },
    []
  );

  const handleRevoke = useCallback(async () => {
    if (!user?.id) return null;

    return await updateRating('revoke');
  }, [updateRating, user?.id]);

  /**
   * Makes all DB calls to update rating when the snippet was liked
   */
  const handleLike = useCallback(
    async (initialStatus: typeof status, initialRating: number) => {
      let revokeResult;
      let updateResult;

      switch (status) {
        case 'liked':
          // Click on already liked rating should only revoke the rating (toggle)
          setStatus('not rated');
          setCurrentRating(prevState => prevState - 1);
          revokeResult = await handleRevoke();
          if (typeof revokeResult !== 'number' || isNaN(revokeResult)) {
            resetStateChanges(initialStatus, initialRating);
            break;
          }
          setCurrentRating(revokeResult);
          break;

        case 'disliked':
          // Previously disliked changes state to 'liked' and increments the rating by 2
          setStatus('liked');
          setCurrentRating(prevState => prevState + 2);

          revokeResult = await handleRevoke();
          if (typeof revokeResult !== 'number' || isNaN(revokeResult)) {
            resetStateChanges(initialStatus, initialRating);
            throw new Error('Revoking rating on increment failed');
          }
          updateResult = await updateRating('increment');
          if (typeof updateResult !== 'number' || isNaN(updateResult)) {
            // In this case revoke was successful and we need to reflect it
            resetStateChanges('not rated', initialRating + 1);
            break;
          }
          setCurrentRating(updateResult);
          break;

        default:
          setStatus('liked');
          setCurrentRating(prevState => prevState + 1);
          updateResult = await updateRating('increment');
          if (typeof updateResult !== 'number' || isNaN(updateResult)) {
            resetStateChanges(initialStatus, initialRating);
            break;
          }
          setCurrentRating(updateResult);
          break;
      }

      return;
    },
    [status, handleRevoke, resetStateChanges, updateRating]
  );

  /**
   * Makes all DB calls to update rating when the snippet was disliked
   */
  const handleDislike = useCallback(
    async (initialStatus: typeof status, initialRating: number) => {
      let revokeResult;
      let updateResult;

      switch (status) {
        case 'disliked':
          setStatus('not rated');
          setCurrentRating(prevState => prevState + 1);
          revokeResult = await handleRevoke();
          if (typeof revokeResult !== 'number' || isNaN(revokeResult)) {
            resetStateChanges(initialStatus, initialRating);
            break;
          }
          setCurrentRating(revokeResult);
          break;

        case 'liked':
          setStatus('disliked');
          setCurrentRating(prevState => prevState - 2);
          revokeResult = await handleRevoke();
          if (typeof revokeResult !== 'number' || isNaN(revokeResult)) {
            resetStateChanges(initialStatus, initialRating);
            throw new Error('Revoking rating on decrement failed');
          }
          updateResult = await updateRating('decrement');
          if (typeof updateResult !== 'number' || isNaN(updateResult)) {
            // In this case revoke was successful and we need to reflect it
            resetStateChanges('not rated', initialRating - 1);
            break;
          }
          setCurrentRating(updateResult);
          break;

        default:
          setStatus('disliked');
          setCurrentRating(prevState => prevState - 1);
          updateResult = await updateRating('decrement');
          if (typeof updateResult !== 'number' || isNaN(updateResult)) {
            resetStateChanges(initialStatus, initialRating);
            break;
          }
          setCurrentRating(updateResult);
          break;
      }

      return;
    },
    [status, handleRevoke, resetStateChanges, updateRating]
  );

  const handleRatingAction = useCallback(
    async (action: 'increment' | 'decrement') => {
      if (!user?.id || isUpdating || status === null) return;
      try {
        setIsUpdating(true);

        // Initial state values. Used for resetting in case of errors from backend
        const initialStatus = status;
        const initialRating = currentRating;

        switch (action) {
          case 'increment':
            await handleLike(initialStatus, initialRating);
            break;

          case 'decrement':
            await handleDislike(initialStatus, initialRating);
            break;

          default:
            break;
        }
      } catch (err) {
        const log = (await import('next-axiom')).log;
        log.error(`Rating ${action} failed`, { err });
      } finally {
        setIsUpdating(false);
      }

      return;
    },
    [user?.id, isUpdating, status, currentRating, handleLike, handleDislike]
  );

  // Get user's activity on the rating (liked, disliked or not rated)
  useEffect(() => {
    if (!user?.id || isUpdating) return;
    const controller = new AbortController();

    const fetchRatingStatus = async () => {
      try {
        const supabase = (await import('@/services/supabase/supabase')).default;
        const { data, error } = await supabase
          .from('snippets_ratings_records')
          .select('action')
          .abortSignal(controller.signal)
          .eq('rating_id', ratingId)
          .eq('user_id', user?.id)
          .limit(1);
        if (error) throw error;

        if (!data || data.length <= 0 || !data[0]?.action) {
          setStatus('not rated');
          return;
        }

        const action = data[0].action;
        switch (action) {
          case 'increment':
            setStatus('liked');
            break;

          case 'decrement':
            setStatus('disliked');
            break;

          default:
            break;
        }
      } catch (err) {
        const log = (await import('next-axiom')).log;
        log.error("Error while fetching user's activity on rating", {
          err,
          ratingId
        });
      }
    };

    fetchRatingStatus();

    return () => controller.abort();
  }, [ratingId, user?.id, isUpdating]);

  return { currentRating, status, isUpdating, handleRatingAction };
}

export default useRatingActions;
