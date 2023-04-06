import { useContext, useEffect, useState } from 'react';
import { log } from 'next-axiom';
import { Button, Flex, Text, useColorModeValue } from '@chakra-ui/react';

import { AuthContext } from '@/context/AuthContext';
import { SnippetType } from '@/services/types';
import supabase from '@/services/supabase/supabase';

type RatingProps = Pick<SnippetType['rating'], 'id' | 'rating'>;

function Rating({ id, rating }: RatingProps) {
  const [currentRating, setCurrentRating] = useState<number>(Number(rating));
  const [status, setStatus] = useState<'liked' | 'disliked' | null>(null);
  const [isChangingRating, setIsChangingRating] = useState<boolean>(false);

  const increaseRatingBtnColor = useColorModeValue(
    'secondary-light-theme',
    'secondary-dark-theme'
  );

  const user = useContext(AuthContext);

  const fetchRatingUpdate = async (
    action: 'increment' | 'decrement' | 'revoke'
  ) => {
    try {
      // Get user's JWT
      const { data, error: sessionError } = await supabase.auth.getSession();
      if (sessionError) throw sessionError;
      const jwt = data.session?.access_token;

      const res = await fetch('/api/snippets/rating', {
        method: 'POST',
        credentials: 'same-origin',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          ratingId: id,
          action,
          jwt
        })
      });

      if (!res.ok) {
        const err = await res.json();
        throw err;
      }

      const updatedRating = await res.json();

      return updatedRating.rating as number;
    } catch (err) {
      console.error(err);
      return null;
    }
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
    if (!user?.id || isChangingRating) return;
    const controller = new AbortController();

    const fetchRatingStatus = async () => {
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
        log.error("Error while fetching user's activity on rating", {
          err,
          ratingId: id
        });
      }
    };

    fetchRatingStatus();

    return () => controller.abort();
  }, [id, user?.id, isChangingRating]);

  return currentRating !== null ? (
    <Flex alignItems="center" gap={1} position="relative" left="-1.5">
      <Button
        size="small"
        aria-label="Like snippet"
        colorScheme={increaseRatingBtnColor}
        isDisabled={!user}
        minHeight="2rem"
        minWidth="2rem"
        onClick={handleLike}
        textColor={!user?.id ? 'text' : status !== 'liked' ? 'text' : undefined}
        variant="ghost"
      >
        <Text fontWeight="bold">++</Text>
      </Button>
      <Text fontWeight="bold" minWidth="1rem" textAlign="center">
        {currentRating}
      </Text>
      <Button
        size="small"
        aria-label="Dislike snippet"
        colorScheme="red"
        isDisabled={!user}
        minHeight="2rem"
        minWidth="2rem"
        onClick={handleDislike}
        textColor={
          !user?.id
            ? 'text'
            : status !== 'disliked'
            ? 'text-secondary'
            : 'red.600'
        }
        variant="ghost"
      >
        <Text fontWeight="bold">––</Text>
      </Button>
    </Flex>
  ) : (
    <></> // TODO: load skeleton
  );
}

export default Rating;
