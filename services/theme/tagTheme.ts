import { tagAnatomy } from '@chakra-ui/anatomy';
import { createMultiStyleConfigHelpers } from '@chakra-ui/react';

const { definePartsStyle, defineMultiStyleConfig } =
  createMultiStyleConfigHelpers(tagAnatomy.keys);

const baseStyle = definePartsStyle({
  container: {
    _hover: {
      bg: 'tag-hover-bg'
    }
  },
  label: {
    color: 'chakra-body-text',
    a: {
      _hover: {
        color: 'chakra-body-text'
      }
    }
  }
});

export const tagTheme = defineMultiStyleConfig({ baseStyle });
