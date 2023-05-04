import { Avatar, AvatarProps } from '@chakra-ui/react';

import fadeInAnimation from '@/services/utils/styling/fadeInAnimation';

const sizes = {
  micro: {
    side: 25,
    borderWidth: '1px',
    padding: '2px'
  },
  xs: {
    side: 34,
    borderWidth: '1px',
    padding: '2px'
  },
  sm: {
    side: 53,
    borderWidth: '1px',
    padding: '3px'
  },
  md: {
    side: 84,
    borderWidth: '2px',
    padding: '4px'
  },
  lg: {
    side: 114,
    borderWidth: '2px',
    padding: '5px'
  }
};

interface UserAvatarProps extends AvatarProps {
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
  noBorder = false,
  ...props
}: UserAvatarProps) {
  return (
    <Avatar
      aria-label={`${username ?? 'guest'} avatar`}
      name={disabled ? '' : username ?? ''}
      src={disabled ? '' : avatar ?? '/images/GuestAvatar.svg'}
      loading="lazy"
      borderColor="primary"
      showBorder={disabled ? false : !noBorder}
      borderWidth={disabled || noBorder ? 'none' : sizes[size].borderWidth}
      h={sizes[size].side}
      w={sizes[size].side}
      p={disabled || noBorder ? 0 : sizes[size].padding}
      sx={fadeInAnimation()}
      {...props}
    />
  );
}

export default UserAvatar;
