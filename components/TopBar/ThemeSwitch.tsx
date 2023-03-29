import {
  HTMLChakraProps,
  IconButton,
  ThemingProps,
  useColorMode
} from '@chakra-ui/react';

import MoonIcon from '@/components/Icons/MoonIcon';
import SunIcon from '@/components/Icons/SunIcon';

function ThemeSwitch(
  props?: ThemingProps<'Button'> & HTMLChakraProps<'button'>
) {
  const { colorMode, toggleColorMode } = useColorMode();
  return (
    <IconButton
      colorScheme={
        colorMode === 'light' ? 'primary-light-theme' : 'primary-dark-theme'
      }
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
      {...props}
    />
  );
}

export default ThemeSwitch;
