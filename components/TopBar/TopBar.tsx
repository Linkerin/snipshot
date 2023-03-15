import { Flex } from '@chakra-ui/react';

import SearchBox from './SearchBox';

function TopBar() {
  return (
    <Flex
      h="58px"
      w="100%"
      mb={2}
      pt={3}
      px={3}
      position="sticky"
      top={0}
      zIndex={1}
      bgColor="white"
    >
      <SearchBox />
    </Flex>
  );
}

export default TopBar;
