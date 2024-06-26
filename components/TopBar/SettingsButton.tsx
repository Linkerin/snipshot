import NextLink from 'next/link';
import { IconButton, useColorModeValue } from '@chakra-ui/react';

import SettingsIcon from '@/components/Icons/SettingsIcon';

function SettingsButton() {
  const btnColor = useColorModeValue(
    'primary-light-theme',
    'primary-dark-theme'
  );
  return (
    <IconButton
      as={NextLink}
      aria-label="Navigate to settings page"
      href="/settings"
      prefetch={false}
      colorScheme={btnColor}
      borderRadius="30%"
      icon={<SettingsIcon boxSize={6} />}
      variant="ghost"
    />
  );
}

export default SettingsButton;
