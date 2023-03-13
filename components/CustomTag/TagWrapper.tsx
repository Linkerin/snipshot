import { Tag, TagProps } from '@chakra-ui/react';

function TagWrapper(props: TagProps) {
  return (
    <Tag
      size="sm"
      variant="outline"
      borderRadius="full"
      m={0}
      py={1}
      px={2}
      {...props}
    >
      {props.children}
    </Tag>
  );
}

export default TagWrapper;
