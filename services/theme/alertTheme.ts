import { alertAnatomy } from '@chakra-ui/anatomy';
import { createMultiStyleConfigHelpers } from '@chakra-ui/react';

const { definePartsStyle, defineMultiStyleConfig } =
  createMultiStyleConfigHelpers(alertAnatomy.keys);

const baseStyle = definePartsStyle({
  container: {
    borderRadius: '8px'
  }
});

const infoStyle = definePartsStyle({
  container: {
    bgColor: 'primary-light-theme.50',
    _dark: {
      bgColor: 'primary-dark-theme.900'
    }
  },

  icon: {
    color: 'primary-light-theme.300',
    _dark: {
      color: 'primary-dark-theme.400'
    }
  }
});

export const alertTheme = defineMultiStyleConfig({
  variants: { info: infoStyle },
  baseStyle
});
