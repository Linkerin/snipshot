import { extendTheme } from '@chakra-ui/react';

import { tagTheme } from './tagTheme';

// const hour = new Date().getHours();
// const whiteColor = hour > 18 || hour < 9 ? '#fffff3' : '#fafdfa';

const theme = extendTheme({
  components: { Tag: tagTheme }
});

export default theme;
