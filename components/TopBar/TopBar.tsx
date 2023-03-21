import { Flex, useColorModeValue } from '@chakra-ui/react';

import SearchBox from './SearchBox';
import ThemeSwitch from './ThemeSwitch';

function TopBar() {
  const bgColor = useColorModeValue('white', 'black');

  return (
    <Flex
      alignItems="center"
      justifyContent="space-between"
      pt={4}
      pb={2}
      px={3}
      zIndex={1}
      bgColor={bgColor}
      mb={3}
    >
      <SearchBox />
      <ThemeSwitch />
    </Flex>
  );
}

export default TopBar;
