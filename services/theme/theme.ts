import { extendTheme } from '@chakra-ui/react';

import { tagTheme } from './tagTheme';

// const hour = new Date().getHours();
// const whiteColor = hour > 18 || hour < 9 ? '#fffff3' : '#fafdfa';

const theme = extendTheme({
  colors: {
    white: '#fafdfa',
    black: '#282a36'
  },
  components: { Tag: tagTheme },
  fontSizes: {
    codeSize: '0.8rem'
  }
});

export default theme;
