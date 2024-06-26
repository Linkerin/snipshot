import { useContext } from 'react';
import dynamic from 'next/dynamic';
import { ButtonGroup, Flex } from '@chakra-ui/react';

import { AuthContext } from '@/context/AuthContext';
import ThemeSwitch from './ThemeSwitch';

const AboutMobileButton = dynamic(() => import('./AboutMobileButton'));
const Logo = dynamic(() => import('@/components/Common/Logo'), {
  loading: () => <div />
});
const SettingsButton = dynamic(() => import('./SettingsButton'));

function MobileTopBar() {
  const [user] = useContext(AuthContext);
  return (
    <Flex
      alignItems="center"
      justifyContent="space-between"
      px={3}
      py={2}
      zIndex={1}
      backgroundColor="chakra-body-bg"
    >
      <Logo height={42} isLink />
      <ButtonGroup>
        {user?.id && <SettingsButton />}
        {!user?.id && <AboutMobileButton />}
        <ThemeSwitch />
      </ButtonGroup>
    </Flex>
  );
}

export default MobileTopBar;
