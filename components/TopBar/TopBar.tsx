import dynamic from 'next/dynamic';
import { Flex } from '@chakra-ui/react';

import ThemeSwitch from './ThemeSwitch';

const SearchBox = dynamic(() => import('./SearchBox'), {
  loading: () => <div />
});

function TopBar() {
  return (
    <Flex
      alignItems="center"
      justifyContent="space-between"
      pt={4}
      pb={2}
      px={3}
      mb={0}
    >
      <SearchBox />
      <ThemeSwitch />
    </Flex>
  );
}

export default TopBar;
