import { useContext, useEffect, useState } from 'react';

import { AuthContext } from '@/context/AuthContext';
import supabase from '@/services/supabase';

import { SnippetType } from '@/services/types';

type RatingProps = Pick<SnippetType['rating'], 'id' | 'rating'>;

function Rating({ id, rating }: RatingProps) {
  const [currentRating, setCurrentRating] = useState<number>(Number(rating));
  const [status, setStatus] = useState<'liked' | 'disliked' | null>(null);
  const [isChangingRating, setIsChangingRating] = useState<boolean>(false);

  const user = useContext(AuthContext);

  const fetchRatingUpdate = async (
    action: 'increment' | 'decrement' | 'revoke'
  ) => {
    const res = await fetch('/api/snippets/rating', {
      method: 'POST',
      credentials: 'same-origin',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        ratingId: id,
        action
      })
    });

    if (!res.ok) {
      console.error(await res.json());
      return null;
    }

    const updatedRating = await res.json();

    return updatedRating.rating as number;
  };

  interface HandlebackendResponsePropsArgs {
    initialStatus: typeof status;
    initialRating: typeof currentRating;
    promises: (number | Promise<any> | null | undefined)[];
  }

  const handlebackendResponse = async ({
    initialStatus,
    initialRating,
    promises
  }: HandlebackendResponsePropsArgs) => {
    const resetStateChanges = () => {
      setStatus(initialStatus);
      setCurrentRating(initialRating);
    };

    await Promise.all(promises)
      .then(values => {
        // Reset rating state in case errors from backend (promise resolved to `null`)
        if (values.some(result => result === null)) {
          resetStateChanges();
        }
      })
      .catch(err => {
        resetStateChanges();
        console.error(err);
      });

    return;
  };

  const handleRevoke = async () => {
    if (!user) return null;

    return await fetchRatingUpdate('revoke');
  };

  const handleLike = async () => {
    if (!user || isChangingRating) return;

    setIsChangingRating(true);
    // Initial state values. Used for resetting in case of errors from backend
    const initialStatus = status;
    const initialRating = currentRating;

    let revokePromise;
    let updatePromise;

    switch (status) {
      case 'liked':
        // Click on already liked rating should only revoke the rating (toggle)
        setStatus(null);
        setCurrentRating(prevState => prevState - 1);
        revokePromise = handleRevoke();
        break;

      case 'disliked':
        setStatus('liked');
        setCurrentRating(prevState => prevState + 2);

        revokePromise = await handleRevoke();
        updatePromise = fetchRatingUpdate('increment');
        break;

      default:
        setStatus('liked');
        setCurrentRating(prevState => prevState + 1);
        updatePromise = fetchRatingUpdate('increment');
        break;
    }

    await handlebackendResponse({
      initialRating,
      initialStatus,
      promises: [revokePromise, updatePromise]
    });

    setIsChangingRating(false);

    return;
  };

  const handleDislike = async () => {
    if (!user || isChangingRating) return;

    setIsChangingRating(true);
    // Initial state values. Used for resetting in case of errors from backend
    const initialStatus = status;
    const initialRating = currentRating;

    let revokePromise;
    let updatePromise;

    switch (status) {
      case 'disliked':
        setStatus(null);
        setCurrentRating(prevState => prevState + 1);
        revokePromise = handleRevoke();
        break;

      case 'liked':
        setStatus('disliked');
        setCurrentRating(prevState => prevState - 2);
        revokePromise = await handleRevoke();
        updatePromise = fetchRatingUpdate('decrement');
        break;

      default:
        setStatus('disliked');
        setCurrentRating(prevState => prevState - 1);
        updatePromise = fetchRatingUpdate('decrement');
        break;
    }

    await handlebackendResponse({
      initialRating,
      initialStatus,
      promises: [revokePromise, updatePromise]
    });

    setIsChangingRating(false);

    return;
  };

  // Get user's activity on the rating (liked, disliked or not rated)
  useEffect(() => {
    const controller = new AbortController();

    const fetchRatingStatus = async () => {
      if (!user || isChangingRating) return;

      try {
        const { data, error } = await supabase
          .from('snippets_ratings_records')
          .select('action')
          .abortSignal(controller.signal)
          .eq('rating_id', id)
          .eq('user_id', user?.id)
          .limit(1);
        if (error) throw error;

        if (!data || data.length <= 0) {
          setStatus(null);
          return;
        }

        if (data[0]?.action === 'increment') {
          setStatus('liked');
          return;
        }

        if (data[0]?.action === 'decrement') setStatus('disliked');
        return;
      } catch (err) {
        console.error(err);
      }
    };

    fetchRatingStatus();

    return () => controller.abort();
  }, [id, user, currentRating, isChangingRating]);

  return currentRating !== null ? (
    <Stack direction="row" spacing={1} alignItems="center">
      <Button
        size="small"
        aria-label="Like snippet"
        color="secondary"
        disabled={!user}
        sx={{ minWidth: 34 }}
        onClick={handleLike}
      >
        <Typography
          color={user && status !== 'liked' ? 'text.primary' : undefined}
          fontWeight="fontWeightBold"
        >
          ++
        </Typography>
      </Button>
      <Typography
        color="text.primary"
        fontWeight="fontWeightBold"
        align="center"
        sx={{ cursor: 'default', width: 9 }}
      >
        {currentRating}
      </Typography>
      <Button
        size="small"
        aria-label="Dislike snippet"
        color="error"
        disabled={!user}
        sx={{ minWidth: 34 }}
        onClick={handleDislike}
      >
        <Typography
          color={user && status !== 'disliked' ? 'text.secondary' : undefined}
          fontWeight="fontWeightBold"
        >
          ––
        </Typography>
      </Button>
    </Stack>
  ) : (
    <RatingSkeleton />
  );
}

export default Rating;
