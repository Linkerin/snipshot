import dynamic from 'next/dynamic';
import { Flex } from '@chakra-ui/react';

import ThemeSwitch from './ThemeSwitch';

const Logo = dynamic(() => import('@/components/Logo'), {
  loading: () => <div />
});

function MobileTopBar() {
  return (
    <Flex
      as="header"
      alignItems="center"
      justifyContent="space-between"
      px={3}
      py={2}
      zIndex={1}
      backgroundColor="chakra-body-bg"
    >
      <Logo height={42} isLink />
      <ThemeSwitch mr={0} />
    </Flex>
  );
}

export default MobileTopBar;
