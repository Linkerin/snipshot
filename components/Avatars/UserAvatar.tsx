import { useContext } from 'react';
import { Box, Image } from '@chakra-ui/react';

import { AuthContext } from '@/context/AuthContext';
import UserIcon from '@/components/Icons/UserIcon';
import GuestAvatarSvg from './GuestAvatarSvg';
// ADD credits to guest avatar svg
// <a href='https://www.freepik.com/vectors/cute-sloth'>Cute sloth vector created by catalyststuff - www.freepik.com</a>

interface UserAvatarProps {
  small?: boolean;
}

function UserAvatar({ small = false }: UserAvatarProps) {
  const user = useContext(AuthContext);

  const AvatarContainer = ({ children }: { children: React.ReactElement }) => {
    return (
      <Box
        css={{
          borderWidth: '2px',
          borderStyle: 'solid',
          borderColor: 'currentColor',
          borderRadius: '50%',
          margin: 0,
          padding: 5,
          height: 100,
          width: 100,
          svg: {
            width: '100%',
            height: 'auto',
            borderRadius: '50%'
          },
          img: {
            width: '100%',
            height: 'auto',
            borderRadius: '50%'
          }
        }}
      >
        {children}
      </Box>
    );
  };

  return (
    <AvatarContainer>
      {user?.avatar ? (
        <Image
          src={user?.avatar}
          alt={`${user.username} avatar`}
          fallback={<UserIcon />}
        />
      ) : (
        <GuestAvatarSvg />
      )}
    </AvatarContainer>
  );
}

export default UserAvatar;
