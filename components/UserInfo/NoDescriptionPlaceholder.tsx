import { Text, TextProps } from '@chakra-ui/react';

function NoDescriptionPlaceholder(props: TextProps) {
  return (
    <Text fontSize="xs" fontStyle="italic" color="text-secondary" {...props}>
      Do you want to write something about yourself here?
    </Text>
  );
}

export default NoDescriptionPlaceholder;
