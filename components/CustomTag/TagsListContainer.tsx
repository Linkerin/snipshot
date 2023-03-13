import { Box } from '@chakra-ui/react';

function TagsListContainer({
  children
}: {
  children: React.ReactElement | React.ReactElement[] | undefined;
}) {
  return (
    <Box
      display="flex"
      flexDirection="row"
      alignItems="center"
      justifyContent="flex-start"
      gap={1}
      flexWrap="wrap"
      w="100%"
    >
      {children}
    </Box>
  );
}

export default TagsListContainer;
