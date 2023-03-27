import { Card, CardBody, Stack, Text } from '@chakra-ui/react';

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
    <Card mb={4} mt={1} variant="outline">
      <CardBody
        as={Stack}
        direction="row"
        justifyContent="space-evenly"
        w="100%"
        spacing={0}
        p={0}
      >
        <Stack alignItems="center" spacing={0} py={0.5}>
          <Text fontSize="sm" as="b">
            {snippets !== null ? snippets : '–'}
          </Text>
          <Text fontSize="xs" color="gray.500">
            snips
          </Text>
        </Stack>
        <VerticalDivider color="#E2E8F0" />
        <Stack alignItems="center" spacing={0} py={0.5}>
          <Text fontSize="sm" as="b">
            {favorites !== null ? favorites : '–'}
          </Text>
          <Text fontSize="xs" color="gray.500">
            favorites
          </Text>
        </Stack>
        <VerticalDivider color="#E2E8F0" />
        <Stack alignItems="center" spacing={0} py={0.5}>
          <Text fontSize="sm" as="b">
            {rating !== null ? rating : '–'}
          </Text>
          <Text fontSize="xs" color="gray.500">
            rating
          </Text>
        </Stack>
      </CardBody>
    </Card>
  );
}

export default MobileProfileStats;
