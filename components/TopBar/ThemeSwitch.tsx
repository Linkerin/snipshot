import { IconButton, useColorMode } from '@chakra-ui/react';

import MoonIcon from '@/components/Icons/MoonIcon';
import SunIcon from '@/components/Icons/SunIcon';

function ThemeSwitch() {
  const { colorMode, toggleColorMode } = useColorMode();
  return (
    <IconButton
      colorScheme="purple"
      aria-label="Theme color switch"
      borderRadius="30%"
      icon={
        colorMode === 'light' ? (
          <SunIcon boxSize={6} />
        ) : (
          <MoonIcon boxSize={5} />
        )
      }
      onClick={toggleColorMode}
      variant="outline"
      mr={5}
    />
  );
}

export default ThemeSwitch;
