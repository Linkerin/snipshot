import { extendTheme, type ThemeConfig } from '@chakra-ui/react';

import { tagTheme } from './tagTheme';
import { cardTheme } from './cardTheme';

const hour = new Date().getHours();
const whiteColor = hour > 18 || hour < 9 ? '#fffff3' : '#fafdfa';
const blackColor = '#282a36';

const config: ThemeConfig = {
  initialColorMode: 'dark',
  useSystemColorMode: false
};

const theme = extendTheme({
  config,
  styles: {
    global: {
      a: {
        _hover: {
          color: 'primary'
        }
      }
    }
  },
  semanticTokens: {
    colors: {
      'chakra-body-bg': { _light: whiteColor, _dark: blackColor },
      'chakra-body-text': { _light: '#3b4642', _dark: whiteColor },
      primary: {
        _light: '#875ede',
        _dark: '#00e0bc'
      },
      'primary-dark': {
        _light: '#7854C5',
        _dark: '#009c83'
      },
      secondary: {
        _light: '#10a483',
        _dark: '#ffe600'
      },
      'text-secondary': {
        _light: '#666662',
        _dark: '#a0b4ae'
      },
      'custom-white': '#fafdfa',
      'custom-black': blackColor,
      'card-background': {
        _dark: '#373945'
      },
      'tag-hover-bg': {
        _light: 'blackAlpha.50',
        _dark: 'whiteAlpha.200'
      }
    }
  },
  components: { Tag: tagTheme, Card: cardTheme },
  fontSizes: {
    codeSize: '0.8rem'
  }
});

export default theme;
