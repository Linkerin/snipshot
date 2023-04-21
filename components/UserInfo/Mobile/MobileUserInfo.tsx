import { As, Box, Flex, Text } from '@chakra-ui/react';

import MobileLogoutBtn from './MobileLogoutBtn';
import MobileProfileStats from './MobileProfileStats';
import MobileUserDescription from './MobileUserDescription/MobileUserDescription';
import UserAvatar from '@/components/UserInfo/Avatars/UserAvatar';
import Username from '@/components/UserInfo/Username';

interface UserInfoProps {
  as?: As<any>;
  avatar?: string;
  registered?: string;
  username?: string;
}

function MobileUserInfo({ as, avatar, registered, username }: UserInfoProps) {
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
        <MobileLogoutBtn username={username} />
      </Flex>
      <MobileUserDescription username={username} />
      <MobileProfileStats username={username} />
    </>
  );
}

export default MobileUserInfo;
