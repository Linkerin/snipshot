import NextLink from 'next/link';
import {
  HTMLChakraProps,
  IconButton,
  ThemingProps,
  useColorModeValue
} from '@chakra-ui/react';

import SettingsIcon from '@/components/Icons/SettingsIcon';

function SettingsButton() {
  const btnColor = useColorModeValue(
    'primary-light-theme',
    'primary-dark-theme'
  );
  return (
    <IconButton
      as={NextLink}
      href="/settings"
      aria-label="Navigate to settings page"
      prefetch={false}
      colorScheme={btnColor}
      borderRadius="30%"
      icon={<SettingsIcon boxSize={6} />}
      variant="ghost"
    />
  );
}

export default SettingsButton;
