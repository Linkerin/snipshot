import { IconButton, Link, useColorModeValue } from '@chakra-ui/react';

import SettingsIcon from '@/components/Icons/SettingsIcon';

function SettingsButton() {
  const btnColor = useColorModeValue(
    'primary-light-theme',
    'primary-dark-theme'
  );
  return (
    <IconButton
      as={Link}
      href="/settings"
      aria-label="Navigate to settings page"
      colorScheme={btnColor}
      borderRadius="30%"
      icon={<SettingsIcon boxSize={6} />}
      variant="ghost"
    />
  );
}

export default SettingsButton;
