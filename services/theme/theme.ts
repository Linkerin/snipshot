import { extendTheme, type ThemeConfig } from '@chakra-ui/react';
import { mode } from '@chakra-ui/theme-tools';
import type { StyleFunctionProps } from '@chakra-ui/styled-system';

import { alertTheme } from './alertTheme';
import { cardTheme } from './cardTheme';
import { linkTheme } from './linkTheme';
import { tagTheme } from './tagTheme';

const hour = new Date().getHours();
const whiteColor = hour >= 18 || hour < 9 ? '#fffff3' : '#fafdfa';
const blackColor = '#282a36';

const config: ThemeConfig = {
  initialColorMode: 'dark',
  useSystemColorMode: false
};

const theme = extendTheme({
  config,
  styles: {
    global: (props: StyleFunctionProps) => ({
      '*': {
        padding: 0,
        margin: 0,
        boxSizing: 'border-box',
        scrollbarWidth: '4px',
        scrollbarColor: 'primary-dark'
      },
      '*::-webkit-scrollbar': {
        width: '8px',
        direction: 'rtl'
      },
      '*::-webkit-scrollbar-thumb': {
        // backgroundColor: 'primary-dark',
        borderRadius: '4px',
        border: 'solid 2px transparent',
        boxShadow: `inset 0 0 2px 2px ${mode('#7854C5', '#009c83')(props)}`
      },
      '*::-webkit-scrollbar-track': {
        borderRadius: '4px'
      }
    })
  },
  colors: {
    'primary-light-theme': {
      50: '#f0e9ff',
      100: '#d0bff5',
      200: '#c2adf0',
      300: '#b095ea',
      400: '#916be1',
      500: '#7141d7',
      600: '#5828bd',
      700: '#441e94',
      800: '#31166b',
      900: '#1d0c41'
    },
    'primary-dark-theme': {
      50: '#abffff',
      100: '#7afff8',
      200: '#1affe2',
      300: '#00e6c1',
      400: '#00d4b2',
      500: '#00b3a2',
      600: '#019486',
      700: '#00807c',
      800: '#004d4e',
      900: '#001c1c'
    },
    'secondary-light-theme': {
      50: '#ddfff8',
      100: '#b3f9ea',
      200: '#89f4dc',
      300: '#5cefce',
      400: '#34ebc1',
      500: '#1dd1a7',
      600: '#10a382',
      700: '#03745d',
      800: '#004738',
      900: '#001913'
    },
    'secondary-dark-theme': {
      50: '#ffe91a',
      100: '#ffed4b',
      200: '#ffe91a',
      300: '#ffe600',
      400: '#e6cf00',
      500: '#cfba00',
      600: '#b3a100',
      700: '#807300',
      800: '#4d4500',
      900: '#1c1700'
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
      }
    }
  },
  components: {
    Alert: alertTheme,
    Card: cardTheme,
    Link: linkTheme,
    Tag: tagTheme
  },
  fontSizes: {
    codeSize: '0.8rem'
  },
  shadows: {
    base: '0 1px 3px 0 rgba(0, 0, 0, 0.15), 0 1px 2px 0 rgba(0, 0, 0, 0.06)'
  }
});

export default theme;
