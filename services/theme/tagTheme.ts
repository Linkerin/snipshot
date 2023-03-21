import { tagAnatomy } from '@chakra-ui/anatomy';
import { createMultiStyleConfigHelpers } from '@chakra-ui/react';

const { definePartsStyle, defineMultiStyleConfig } =
  createMultiStyleConfigHelpers(tagAnatomy.keys);

const baseStyle = definePartsStyle({
  container: {
    _hover: {
      bg: 'blackAlpha.50'
    }
  },
  label: {
    color: 'black'
  }
});

export const tagTheme = defineMultiStyleConfig({ baseStyle });
