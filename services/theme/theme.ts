import { extendTheme, type ThemeConfig } from '@chakra-ui/react';

import { tagTheme } from './tagTheme';

const hour = new Date().getHours();
const whiteColor = hour > 18 || hour < 9 ? '#fffff3' : '#fafdfa';

const config: ThemeConfig = {
  initialColorMode: 'dark',
  useSystemColorMode: false
};

const theme = extendTheme({
  config,
  colors: {
    white: whiteColor,
    black: '#282a36'
  },
  semanticTokens: {
    colors: {
      primary: {
        default: '#875ede',
        _dark: '#00e0bc'
      }
    }
  },
  components: { Tag: tagTheme },
  fontSizes: {
    codeSize: '0.8rem'
  }
});

export default theme;
