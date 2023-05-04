import { useContext } from 'react';
import {
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Divider,
  Flex,
  Skeleton,
  SkeletonText,
  Text
} from '@chakra-ui/react';

import AddComment from './AddComment';
import { AuthContext } from '@/context/AuthContext';
import Comment from './Comment';
import CommentsIcon from '@/components/Icons/CommentsIcon';
import fadeInAnimation from '@/services/utils/styling/fadeInAnimation';
import NoComments from './NoComments';
import { SnippetIdContext } from '@/components/Pages/SnippetPage/SnippetPage';
import useCommentsFetching from '@/hooks/forPages/useCommentsFetching';

function CommentsContainer() {
  const [user] = useContext(AuthContext);
  const snippetId = useContext(SnippetIdContext);
  const { comments, commentsLoadStatus } = useCommentsFetching(snippetId);

  return (
    <Card
      variant="outline"
      as="section"
      bgColor="chakra-body-bg"
      maxHeight={{ base: '100%', lg: '80vh' }}
      sx={fadeInAnimation()}
    >
      <CardHeader px={3} pt={2} pb={2}>
        <Flex alignItems="center" gap={1}>
          <CommentsIcon boxSize={5} />
          <Text fontSize="lg">
            {commentsLoadStatus !== 'finished' && (
              <Skeleton as="span" speed={2}>
                00
              </Skeleton>
            )}
            {commentsLoadStatus === 'finished' && comments.length} comments
          </Text>
        </Flex>
        <Divider mt={2} />
      </CardHeader>
      <CardBody
        as={Flex}
        flexDirection="column"
        gap={2}
        px={3}
        py={1}
        overflowY="scroll"
      >
        {commentsLoadStatus !== 'finished' && (
          <SkeletonText
            speed={2}
            noOfLines={3}
            spacing="3"
            skeletonHeight="3"
            mb={1}
          />
        )}
        {commentsLoadStatus === 'finished' &&
          (comments.length > 0 ? (
            comments.map(comment => (
              <Comment key={comment.id} comment={comment} />
            ))
          ) : (
            <NoComments />
          ))}
      </CardBody>
      {user?.id && (
        <CardFooter as={Flex} flexDirection="column" gap={3} px={3} py={2}>
          <Divider />
          <AddComment />
        </CardFooter>
      )}
    </Card>
  );
}

export default CommentsContainer;
