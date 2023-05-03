import { IconButton, useColorModeValue } from '@chakra-ui/react';

import CopyIcon from '@/components/Icons/CopyIcon';

function SnippetCopyButton({ hovered }: { hovered: boolean }) {
  const copyIconColor = useColorModeValue('text-secondary', 'custom-white');
  const copyIconHoverBgColor = useColorModeValue(
    'blackAlpha.50',
    'whiteAlpha.200'
  );

  return (
    <IconButton
      aria-label="Copy snippet"
      icon={
        <CopyIcon
          boxSize={5}
          color={hovered ? 'primary' : copyIconColor}
          focusable
        />
      }
      bg={hovered ? copyIconHoverBgColor : undefined}
      top="-2"
      variant="ghost"
      size="sm"
    />
  );
}

export default SnippetCopyButton;
