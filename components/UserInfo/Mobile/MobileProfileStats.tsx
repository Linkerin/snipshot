import { Stack } from '@chakra-ui/react';

import ProfileStatsItem from '@/components/UserInfo/ProfileStatsItem';
import VerticalDivider from '@/components/Common/VerticalDivider';
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
    <div />
  ) : (
    <Stack
      bgColor="chakra-body-bg"
      direction="row"
      justifyContent="space-evenly"
      spacing={0}
      position="sticky"
      zIndex={1}
      top="56px"
      pb={1}
      px={0}
      w="100%"
    >
      <ProfileStatsItem
        value={snippets}
        label="snips"
        py={0}
        valueFontSize="sm"
        labelFontSize="xs"
      />
      <VerticalDivider />
      <ProfileStatsItem
        value={favorites}
        label="favorites"
        py={0}
        valueFontSize="sm"
        labelFontSize="xs"
      />
      <VerticalDivider />
      <ProfileStatsItem
        value={rating}
        label="rating"
        py={0}
        valueFontSize="sm"
        labelFontSize="xs"
      />
    </Stack>
  );
}

export default MobileProfileStats;
