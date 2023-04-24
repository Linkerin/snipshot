import { Stack, Text } from '@chakra-ui/react';

import useFetchUserProfileStats from '@/hooks/useFetchUserProfileStats';
import VerticalDivider from '@/components/Common/VerticalDivider';

interface ProfileStatsProps {
  userId?: string;
  username?: string;
}

/**
 * `userId` property prevails over `username`. If `userId` provided,
 * stats fetching will be implemented for that user.
 */
function ProfileStats({ userId, username }: ProfileStatsProps) {
  const {
    isLoading,
    stats: { snippets, favorites, rating }
  } = useFetchUserProfileStats({ userId, username });

  return isLoading || (!userId && !username) ? (
    <div />
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
        <Text as="b">{snippets !== null ? snippets : '–'}</Text>
        <Text fontSize="sm" color="text-secondary">
          snips
        </Text>
      </Stack>
      <VerticalDivider />
      <Stack alignItems="center" spacing={0}>
        <Text as="b">{favorites !== null ? favorites : '–'}</Text>
        <Text fontSize="sm" color="text-secondary">
          favorites
        </Text>
      </Stack>
      <VerticalDivider />
      <Stack alignItems="center" spacing={0}>
        <Text as="b">{rating !== null ? rating : '–'}</Text>
        <Text fontSize="sm" color="text-secondary">
          rating
        </Text>
      </Stack>
    </Stack>
  );
}

export default ProfileStats;
