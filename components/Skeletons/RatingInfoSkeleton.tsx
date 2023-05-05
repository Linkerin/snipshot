import { Skeleton } from '@chakra-ui/react';
import { Flex } from '@chakra-ui/react';

import nLengthArray from '@/services/utils/nLengthArray';

function RatingInfoSkeleton() {
  return (
    <Flex gap={1}>
      {nLengthArray(3).map(elem => (
        <Skeleton key={elem} speed={2} borderRadius="md" h={8} w={8} />
      ))}
    </Flex>
  );
}

export default RatingInfoSkeleton;
