import NextLink from 'next/link';
import { IconButton, useColorModeValue } from '@chakra-ui/react';

import PlusIcon from '@/components/Icons/PlusIcon';

function AddSnippetButton() {
  const buttonColor = useColorModeValue(
    'primary-light-theme',
    'primary-dark-theme'
  );

  return (
    <IconButton
      as={NextLink}
      href="/add"
      prefetch={false}
      colorScheme={buttonColor}
      aria-label="Add snippet page"
      icon={<PlusIcon boxSize={9} color={'custom-white'} />}
      borderRadius="2xl"
      shadow="dark-lg"
      sx={{
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
