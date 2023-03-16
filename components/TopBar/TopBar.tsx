import { Flex } from '@chakra-ui/react';

import SearchBox from './SearchBox';

function TopBar() {
  return (
    <Flex
      alignItems="center"
      pt={4}
      pb={2}
      px={3}
      zIndex={1}
      bgColor="white"
      mb={3}
    >
      <SearchBox />
    </Flex>
  );
}

export default TopBar;
