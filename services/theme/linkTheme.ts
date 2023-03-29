import { defineStyle, defineStyleConfig } from '@chakra-ui/react';

const baseStyle = defineStyle({
  _hover: {
    color: 'primary',
    textDecoration: 'none',
    '-webkit-text-decoration': 'none',
    'text-decoration-color': 'none'
  }
});

export const linkTheme = defineStyleConfig({ baseStyle });
