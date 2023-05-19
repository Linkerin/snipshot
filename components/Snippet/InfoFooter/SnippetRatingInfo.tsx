import { useContext } from 'react';
import { Button, Flex, Text, useColorModeValue } from '@chakra-ui/react';

import { AuthContext } from '@/context/AuthContext';
import { SnippetRatingInfoProps } from '@/services/types';
import RatingInfoSkeleton from '@/components/Skeletons/RatingInfoSkeleton';

import useRatingActions from '@/hooks/useRatingActions';

const buttonSideSize = '2rem';

function SnippetRatingInfo({ ratingId, rating }: SnippetRatingInfoProps) {
  const { currentRating, status, isUpdating, handleRatingAction } =
    useRatingActions({
      ratingId,
      rating
    });

  const increaseRatingBtnColor = useColorModeValue(
    'secondary-light-theme',
    'secondary-dark-theme'
  );

  const [user] = useContext(AuthContext);

  return currentRating !== null ? (
    <Flex alignItems="center" gap={1} position="relative" left="-1.5">
      <Button
        size="small"
        aria-label="Like snippet"
        colorScheme={increaseRatingBtnColor}
        isDisabled={!user || isUpdating}
        minHeight={buttonSideSize}
        minWidth={buttonSideSize}
        onClick={() => handleRatingAction('increment')}
        textColor={!user?.id ? 'text' : status !== 'liked' ? 'text' : undefined}
        variant="ghost"
      >
        <Text fontWeight="bold">++</Text>
      </Button>
      <Text
        aria-label="Snippet's rating"
        fontWeight="bold"
        minWidth="1rem"
        textAlign="center"
      >
        {currentRating}
      </Text>
      <Button
        size="small"
        aria-label="Dislike snippet"
        colorScheme="red"
        isDisabled={!user || isUpdating}
        minHeight={buttonSideSize}
        minWidth={buttonSideSize}
        onClick={() => handleRatingAction('decrement')}
        textColor={
          !user?.id
            ? 'text'
            : status !== 'disliked'
            ? 'text-secondary'
            : 'red.500'
        }
        variant="ghost"
      >
        <Text fontWeight="bold">––</Text>
      </Button>
    </Flex>
  ) : (
    <RatingInfoSkeleton />
  );
}

export default SnippetRatingInfo;
