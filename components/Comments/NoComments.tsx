import { Center, Text, VStack } from '@chakra-ui/react';

import CommentsQuestionIcon from '@/components/Icons/CommentsQuestionIcon';

function NoComments() {
  return (
    <VStack as={Center} py={3}>
      <CommentsQuestionIcon boxSize={7} />
      <Text>There are no comments yet</Text>
    </VStack>
  );
}

export default NoComments;
