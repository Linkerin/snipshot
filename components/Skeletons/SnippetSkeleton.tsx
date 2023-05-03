import {
  Card,
  CardHeader,
  CardBody,
  Divider,
  HStack,
  Skeleton,
  SkeletonProps,
  SkeletonText,
  useColorModeValue
} from '@chakra-ui/react';

function IconSkeleton(props: SkeletonProps) {
  return <Skeleton speed={2} w={8} h={8} borderRadius="lg" {...props} />;
}

function TagSkeleton(props: SkeletonProps) {
  return <Skeleton speed={2} borderRadius="2xl" h={6} w={12} {...props} />;
}

function SnippetSkeleton() {
  const dividerColor = useColorModeValue('gray.300', 'chakra-body-bg');

  return (
    <Card variant="elevated" size="sm" borderRadius={10} w="100%">
      <CardHeader py={1.5}>
        <Skeleton speed={2} h={2.5} my={1} />
      </CardHeader>
      <Divider color={dividerColor} />
      <CardBody>
        <SkeletonText speed={2} noOfLines={3} spacing="3" skeletonHeight="3" />
        <HStack mt={4} spacing={1}>
          <IconSkeleton mr={2} />
          <TagSkeleton />
          <TagSkeleton />
          <TagSkeleton />
        </HStack>
      </CardBody>
    </Card>
  );
}

export default SnippetSkeleton;
