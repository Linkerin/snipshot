import Image from 'next/image';
import { Box } from '@chakra-ui/react';

import GuestAvatar from './GuestAvatar';
// ADD credits to guest avatar svg
// <a href='https://www.freepik.com/vectors/cute-sloth'>Cute sloth vector created by catalyststuff - www.freepik.com</a>

interface UserAvatarProps {
  url?: string;
  username?: string;
  profile?: boolean;
  small?: boolean;
}

function UserAvatar({
  url,
  username,
  profile = false,
  small = false
}: UserAvatarProps) {
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
      {url ? <Image src={url} alt={`${username} avatar`} /> : <GuestAvatar />}
    </AvatarContainer>
  );
}

export default UserAvatar;
