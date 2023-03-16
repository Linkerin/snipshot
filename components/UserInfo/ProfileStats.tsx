import { useEffect, useState } from 'react';

import { Box, Stack, Text } from '@chakra-ui/react';

interface ProfileStatsProps {
  userId?: string;
  username?: string;
}

/**
 * `userId` property prevails over `username`. If `userId` provided,
 * stats fetching will be implemented for that user.
 */
function ProfileStats({ userId, username }: ProfileStatsProps) {
  const [isLoading, setIsLoading] = useState(true);
  const [numOfSnippets, setNumOfSnippets] = useState<number | null>(null);
  const [numOfFavorites, setNumOfFavorites] = useState<number | null>(null);

  useEffect(() => {
    const fetchStats = async () => {
      if (!userId && !username) {
        setIsLoading(false);
        return;
      }

      let id: string;

      try {
        const supabase = (await import('@/services/supabase')).default;
        if (userId) {
          id = userId;
        } else {
          const { data, error } = await supabase
            .from('profiles')
            .select('id')
            .eq('name', username)
            .limit(1)
            .single();
          if (error) throw error;

          id = data?.id;
        }

        const { data, error, count } = await supabase
          .from('snippets')
          .select('id', { count: 'exact', head: true })
          .eq('user_id', id);
        if (error) throw error;

        if (count !== null && count >= 0) {
          setNumOfSnippets(count);
        } else {
          setNumOfSnippets(0);
        }
        setNumOfFavorites(0);
      } catch (err) {
        console.error("Error while fetching user's stats");
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchStats();
  }, [userId, username]);

  return isLoading || (!userId && !username) ? (
    <></>
  ) : (
    <Stack
      direction="row"
      justifyContent="space-evenly"
      mt={2}
      w="100%"
      px={1}
      spacing={0}
    >
      <Stack alignItems="center" spacing={0}>
        <Text as="b">{numOfSnippets}</Text>
        <Text fontSize="sm" color="gray.500">
          snips
        </Text>
      </Stack>
      <Box sx={{ borderLeft: '1px solid currentColor' }} />
      <Stack alignItems="center" spacing={0}>
        <Text as="b">{numOfFavorites}</Text>
        <Text fontSize="sm" color="gray.500">
          favorites
        </Text>
      </Stack>
      <Box sx={{ borderLeft: '1px solid currentColor' }} />
      <Stack alignItems="center" spacing={0}>
        <Text as="b">{numOfFavorites}</Text>
        <Text fontSize="sm" color="gray.500">
          rating
        </Text>
      </Stack>
    </Stack>
  );
}

export default ProfileStats;
