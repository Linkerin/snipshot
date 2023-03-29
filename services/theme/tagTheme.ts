import { tagAnatomy } from '@chakra-ui/anatomy';
import { createMultiStyleConfigHelpers } from '@chakra-ui/react';
import { mode } from '@chakra-ui/theme-tools';

const { definePartsStyle, defineMultiStyleConfig } =
  createMultiStyleConfigHelpers(tagAnatomy.keys);

const baseStyle = definePartsStyle(props => ({
  container: {
    _hover: {
      bg: mode('blackAlpha.50', 'whiteAlpha.200')(props)
    }
  },
  label: {
    color: 'chakra-body-text'
  }
}));

export const tagTheme = defineMultiStyleConfig({ baseStyle });
