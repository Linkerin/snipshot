import { defineStyle, defineStyleConfig } from '@chakra-ui/react';

const baseStyle = defineStyle({
  _hover: {
    color: 'primary',
    textDecoration: 'none',
    textDecorationColor: 'none',
    WebkitTextDecorationColor: 'none'
  }
});

export const linkTheme = defineStyleConfig({ baseStyle });
