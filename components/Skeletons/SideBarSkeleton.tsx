import {
  Card,
  CardBody,
  Center,
  Skeleton,
  SkeletonCircle,
  VStack
} from '@chakra-ui/react';

function SideBarSkeleton() {
  return (
    <Card h="100vh" borderRadius="0 10px 10px 0" overflowY="scroll">
      <CardBody width="100%" mt={4} px={0} py={0}>
        <Skeleton speed={2} h={10} w="75%" borderRadius="md" ml={3} />
        <Center mt={8} mb={20} flexDirection="column">
          <SkeletonCircle speed={2} size="7rem" mb={4} />
          <Skeleton speed={2} h={8} w="70%" />
        </Center>
        <VStack spacing={6} alignItems="flex-start" ml={3}>
          <Skeleton speed={2} h={8} w="90%" />
          <Skeleton speed={2} h={8} w="90%" />
          <Skeleton speed={2} h={8} w="90%" />
        </VStack>
      </CardBody>
    </Card>
  );
}

export default SideBarSkeleton;
