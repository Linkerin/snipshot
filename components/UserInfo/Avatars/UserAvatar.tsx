import { Box, Image } from '@chakra-ui/react';

import UserIcon from '@/components/Icons/UserIcon';
import GuestAvatarSvg from './GuestAvatarSvg';
// ADD credits to guest avatar svg
// <a href='https://www.freepik.com/vectors/cute-sloth'>Cute sloth vector created by catalyststuff - www.freepik.com</a>

const sizes = {
  xs: {
    width: 34,
    height: 34,
    borderWidth: '1px',
    padding: '2px'
  },
  sm: {
    width: 50,
    height: 50,
    borderWidth: '1px',
    padding: '3px'
  },
  md: {
    width: 80,
    height: 80,
    borderWidth: '2px',
    padding: '4px'
  },
  lg: {
    width: 100,
    height: 100,
    borderWidth: '2px',
    padding: '5px'
  }
};

interface UserAvatarProps {
  avatar?: string;
  username?: string;
  size?: keyof typeof sizes;
  disabled?: boolean;
  noBorder?: boolean;
}

function UserAvatar({
  avatar,
  username,
  size = 'lg',
  disabled = false,
  noBorder = false
}: UserAvatarProps) {
  const AvatarContainer = ({ children }: { children: React.ReactNode }) => {
    return (
      <Box
        sx={{
          borderWidth: sizes[size].borderWidth,
          borderStyle: 'solid',
          borderColor: 'primary',
          borderRadius: '50%',
          border: noBorder ? 'none' : undefined,
          margin: 0,
          padding: sizes[size].padding,
          height: 'fit-content',
          width: 'fit-content',
          svg: {
            width: sizes[size].width,
            height: 'auto',
            borderRadius: '50%'
          },
          img: {
            height: 'auto',
            width: sizes[size].width,
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
      {disabled ? (
        <UserIcon bgColor="gray.200" />
      ) : avatar ? (
        <Image
          src={avatar}
          alt={`${username} avatar`}
          fallback={<UserIcon />}
        />
      ) : (
        <GuestAvatarSvg />
      )}
    </AvatarContainer>
  );
}

export default UserAvatar;
