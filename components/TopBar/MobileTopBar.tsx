import { Flex } from '@chakra-ui/react';

import ThemeSwitch from './ThemeSwitch';
import Logo from '../Logo';

function MobileTopBar() {
  return (
    <Flex
      as="header"
      alignItems="center"
      justifyContent="space-between"
      px={3}
      py={2}
      zIndex={1}
      mb={1}
    >
      <Logo height={45} isLink />
      <ThemeSwitch mr={0} />
    </Flex>
  );
}

export default MobileTopBar;
