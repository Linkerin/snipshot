import { Stack } from '@chakra-ui/react';

import fadeInAnimation from '@/services/utils/styling/fadeInAnimation';
import ProfileStatsItem from '@/components/UserInfo/ProfileStatsItem';
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

  return (
    <Stack
      direction="row"
      justifyContent="space-evenly"
      mt={2}
      w="100%"
      px={1}
      spacing={0}
      sx={fadeInAnimation()}
    >
      {!isLoading && (userId || username) && (
        <>
          <ProfileStatsItem value={snippets} label="snips" />
          <VerticalDivider />
          <ProfileStatsItem value={favorites} label="favorites" />
          <VerticalDivider />
          <ProfileStatsItem value={rating} label="rating" />
        </>
      )}
    </Stack>
  );
}

export default ProfileStats;
