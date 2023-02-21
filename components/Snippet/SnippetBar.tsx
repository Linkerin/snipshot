import { Box, HStack } from '@chakra-ui/react';

function SnippetHeadCircle({ color }: { color: string }) {
  return <Box bg={color} borderRadius="50%" w="0.5rem" h="0.5rem" />;
}

function SnippetBar({ children }: { children: React.ReactElement }) {
  return (
    <HStack as="header" spacing={1}>
      <SnippetHeadCircle color="#f18549" />
      <SnippetHeadCircle color="#ffe600" />
      <SnippetHeadCircle color="#0ad787" />
      {children}
    </HStack>
  );
}

export default SnippetBar;
