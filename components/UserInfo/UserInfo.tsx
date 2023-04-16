import dynamic from 'next/dynamic';
import { As, Flex, Text } from '@chakra-ui/react';

import UserAvatar from '@/components/UserInfo/Avatars/UserAvatar';
import Username from '@/components/UserInfo/Username';

const ProfileStats = dynamic(
  () => import('@/components/UserInfo/ProfileStats')
);

interface UserInfoProps {
  as?: As<any>;
  avatar?: string;
  registered?: string;
  userId?: string;
  username?: string;
}

function UserInfo({ as, avatar, registered, userId, username }: UserInfoProps) {
  return (
    <Flex
      as={as}
      flexDirection="column"
      alignItems="center"
      justifyContent="flex-start"
      w="100%"
      gap={1}
    >
      <UserAvatar avatar={avatar} username={username} />
      <Username username={username} />
      <Text
        fontSize="xs"
        color={registered ? 'text-secondary' : 'transparent'}
        cursor="default"
      >
        Member since {registered}
      </Text>
      {(userId || username) && (
        <ProfileStats userId={userId} username={username} />
      )}
    </Flex>
  );
}

export default UserInfo;
