import { useContext, useEffect, useState } from 'react';
import {
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Divider,
  Flex,
  Text
} from '@chakra-ui/react';

import AddComment from './AddComment';
import { AuthContext } from '@/context/AuthContext';
import Comment from './Comment';
import CommentsIcon from '@/components/Icons/CommentsIcon';
import { CommentType } from '@/services/types';
import NoComments from './NoComments';

function CommentsContainer({ snippetId }: { snippetId: string }) {
  const [commentsNumber, setCommentsNumber] = useState<number>(0);
  const [comments, setComments] = useState<CommentType[]>([]);

  const user = useContext(AuthContext);

  // Fetch total number of comments
  useEffect(() => {
    let controller = new AbortController();

    const fetchCommentsNumber = async () => {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API}/comments/number?snippetId=${snippetId}`,
          { signal: controller.signal }
        );
        const data = await res.json();

        if (typeof data?.numOfComments === 'number') {
          setCommentsNumber(data.numOfComments);
        }
      } catch (err) {
        console.error('Error while fetching total number of comments');
        console.error(err);
      }
    };

    fetchCommentsNumber();

    return () => controller.abort();
  }, [snippetId]);

  // Fetch all comments
  useEffect(() => {
    let controller = new AbortController();

    const fetchComments = async () => {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API}/comments?snippetId=${snippetId}`,
          { signal: controller.signal }
        );
        const data = await res.json();

        if (data?.comments?.length > 0) {
          setComments(data.comments);
        }
      } catch (err) {
        console.error('Error while fetching comments');
        console.error(err);
      }
    };

    fetchComments();

    return () => controller.abort();
  }, [snippetId]);

  return (
    <Card variant="outline" as="section">
      <CardHeader px={3} pt={2} pb={0}>
        <Flex alignItems="center" gap={1}>
          <CommentsIcon boxSize={5} />
          <Text fontSize="lg" fontWeight="medium">
            {commentsNumber} comments
          </Text>
        </Flex>
      </CardHeader>
      <CardBody as={Flex} flexDirection="column" gap={2} px={3} py={2}>
        <Divider />
        {comments.length > 0 ? (
          comments.map(comment => (
            <Comment key={comment.id} comment={comment} />
          ))
        ) : (
          <NoComments />
        )}
      </CardBody>
      {user?.id && (
        <CardFooter as={Flex} flexDirection="column" gap={3} px={3} py={1}>
          <Divider />
          <AddComment />
        </CardFooter>
      )}
    </Card>
  );
}

export default CommentsContainer;
