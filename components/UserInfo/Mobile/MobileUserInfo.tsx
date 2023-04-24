import { useContext } from 'react';
import dynamic from 'next/dynamic';
import { As, Box, Flex, Text } from '@chakra-ui/react';

import { AuthContext } from '@/context/AuthContext';
import MobileProfileStats from './MobileProfileStats';
import MobileUserDescription from './MobileUserDescription/MobileUserDescription';
import UserAvatar from '@/components/UserInfo/Avatars/UserAvatar';
import Username from '@/components/UserInfo/Username';

const MobileLogoutBtn = dynamic(() => import('./MobileLogoutBtn'));

interface UserInfoProps {
  as?: As<any>;
  avatar?: string;
  registered?: string;
  username?: string;
}

function MobileUserInfo({ as, avatar, registered, username }: UserInfoProps) {
  const [user] = useContext(AuthContext);

  return (
    <>
      <Flex
        as={as}
        alignItems="center"
        justifyContent="flex-start"
        gap={3}
        w="100%"
        position="sticky"
        top={0}
        zIndex={1}
        bgColor="chakra-body-bg"
        pb={1}
        px={3}
      >
        <UserAvatar avatar={avatar} username={username} size="sm" />
        <Box w="100%">
          <Username username={username} fontSize="xl" />
          <Text
            fontSize="xs"
            color={registered ? 'text-secondary' : 'transparent'}
            cursor="default"
          >
            Member since {registered}
          </Text>
        </Box>
        {username === user?.username && <MobileLogoutBtn />}
      </Flex>
      <MobileUserDescription username={username} />
      <MobileProfileStats username={username} />
    </>
  );
}

export default MobileUserInfo;
