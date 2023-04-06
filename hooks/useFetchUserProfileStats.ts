import { useCallback, useEffect, useState } from 'react';

export interface ProfileStats {
  snippets: null | number | string;
  favorites: null | number | string;
  rating: null | number | string;
}

/**
 * Hook that is used to fetch supabase data about users number of snippets,
 * his rating and number of favourite snippets.
 * For fetching provide `userId` or `username`. `userId` property prevails over `username`.
 * If `userId` provided, stats fetching will be implemented for that user.
 * @param userId prefered parameter
 * @param username
 *
 * @returns An object with 3 properties: `isLoading` that shows the loading process,
 * `numOfSnippets` - number of user's posted snippets,
 * `numOfFavorites` - number of user's favourite snippets
 * @example
 * const { isLoading, numOfSnippets, numOfFavorites } = useFetchUserProfileStats({ username: 'snipshot' });
 */
export default function useFetchUserProfileStats({
  userId,
  username
}: {
  userId?: string;
  username?: string;
}) {
  const [isLoading, setIsLoading] = useState(true);
  const [stats, setStats] = useState<ProfileStats>({
    snippets: null,
    favorites: null,
    rating: null
  });

  const fetchStats = useCallback(
    async (controller: AbortController) => {
      if (!userId && !username) {
        setIsLoading(false);
        return;
      }

      let id: string;

      try {
        const supabase = (await import('@/services/supabase/supabase')).default;
        if (userId) {
          id = userId;
        } else {
          const { data, error } = await supabase
            .from('profiles')
            .select('id')
            .eq('name', username)
            .abortSignal(controller.signal)
            .limit(1)
            .single();
          if (error) throw error;

          id = data?.id;
        }

        const { data, error, count } = await supabase
          .from('snippets')
          .select(
            `
            id,
            snippets_ratings (
              rating
            )
          `,
            { count: 'exact', head: false }
          )
          .eq('user_id', id)
          .abortSignal(controller.signal);
        if (error) throw error;

        if (count !== null && count >= 0) {
          setStats(prevState => ({ ...prevState, snippets: count }));
        } else {
          setStats(prevState => ({ ...prevState, snippets: 0 }));
        }

        const rating = data.reduce((sum, value) => {
          if (!value || !Array.isArray(value.snippets_ratings)) return sum;

          return sum + parseInt(value.snippets_ratings[0].rating);
        }, 0);
        setStats(prevState => ({ ...prevState, rating, favorites: 0 })); // TODO: add count for favorites
      } catch (err) {
        console.error("Error while fetching user's stats");
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    },
    [userId, username]
  );

  useEffect(() => {
    const controller = new AbortController();
    fetchStats(controller);

    return () => controller.abort();
  }, [fetchStats]);

  return { isLoading, stats };
}
