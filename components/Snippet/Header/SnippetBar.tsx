import { Box, Flex, Spacer } from '@chakra-ui/react';

import SnippetBarOptions from './SnippetBarOptions';

function SnippetHeadCircle({ color }: { color: string }) {
  return <Box bg={color} borderRadius="50%" w="0.5rem" h="0.5rem" />;
}

function SnippetBar({ children }: { children: React.ReactElement }) {
  return (
    <Flex as="header" gap={1} alignItems="center" h={4} w="100%">
      <SnippetHeadCircle color="#f18549" />
      <SnippetHeadCircle color="#ffe600" />
      <SnippetHeadCircle color="#0ad787" />
      {children}
      <Spacer />
      <SnippetBarOptions />
    </Flex>
  );
}

export default SnippetBar;
