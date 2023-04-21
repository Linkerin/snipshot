import { Stack, Text } from '@chakra-ui/react';

import VerticalDivider from '@/components/VerticalDivider';
import useFetchUserProfileStats from '@/hooks/useFetchUserProfileStats';

interface MobileProfileStatsProps {
  userId?: string;
  username?: string;
}

/**
 * `userId` property prevails over `username`. If `userId` provided,
 * stats fetching will be implemented for that user.
 */
function MobileProfileStats({ userId, username }: MobileProfileStatsProps) {
  const {
    isLoading,
    stats: { snippets, favorites, rating }
  } = useFetchUserProfileStats({ userId, username });

  return isLoading || (!userId && !username) ? (
    <></>
  ) : (
    <Stack
      bgColor="chakra-body-bg"
      direction="row"
      justifyContent="space-evenly"
      spacing={0}
      position="sticky"
      zIndex={1}
      top="57px"
      pb={1}
      px={0}
      w="100%"
    >
      <Stack alignItems="center" spacing={0} py={0}>
        <Text fontSize="sm" as="b">
          {snippets !== null ? snippets : '–'}
        </Text>
        <Text fontSize="xs" color="text-secondary">
          snips
        </Text>
      </Stack>
      <VerticalDivider />
      <Stack alignItems="center" spacing={0} py={0}>
        <Text fontSize="sm" as="b">
          {favorites !== null ? favorites : '–'}
        </Text>
        <Text fontSize="xs" color="text-secondary">
          favorites
        </Text>
      </Stack>
      <VerticalDivider />
      <Stack alignItems="center" spacing={0} py={0}>
        <Text fontSize="sm" as="b">
          {rating !== null ? rating : '–'}
        </Text>
        <Text fontSize="xs" color="text-secondary">
          rating
        </Text>
      </Stack>
    </Stack>
  );
}

export default MobileProfileStats;
