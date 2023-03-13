import NextLink from 'next/link';
import { IconButton } from '@chakra-ui/react';

import PlusIcon from '@/components/Icons/PlusIcon';

function AddSnippetButton() {
  return (
    <IconButton
      as={NextLink}
      href="/snippets/add"
      aria-label="Add Snippet"
      icon={<PlusIcon boxSize={9} />}
      css={{
        borderRadius: '50%',
        position: 'absolute',
        bottom: 30,
        right: 30,
        height: '3.5rem',
        width: '3.5rem'
      }}
    />
  );
}

export default AddSnippetButton;
