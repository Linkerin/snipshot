import { Tag, TagLabel, TagLeftIcon } from '@chakra-ui/react';

import CheckedIcon from '@/components/Icons/CheckedIcon';

function VerificationTag() {
  return (
    <Tag
      variant="outline"
      size="sm"
      border="1px"
      borderColor={'primary'}
      borderRadius="full"
      boxShadow="none"
      _hover={{ bg: 'none' }}
      pl={1}
      pr={1.5}
      py={1}
    >
      <TagLeftIcon as={CheckedIcon} boxSize={4} color="primary" mr={1} />
      <TagLabel color="primary" cursor="default">
        Verified
      </TagLabel>
    </Tag>
  );
}

export default VerificationTag;
