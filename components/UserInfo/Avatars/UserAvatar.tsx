import { Avatar, AvatarProps } from '@chakra-ui/react';

import CustomSpinner from '@/components/CustomSpinner';

const sizes = {
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
      name={disabled ? '' : username}
      src={disabled ? '' : avatar ?? '/images/GuestAvatar.svg'}
      loading="lazy"
      borderColor="primary"
      showBorder={disabled ? false : !noBorder}
      borderWidth={disabled || noBorder ? 'none' : sizes[size].borderWidth}
      h={sizes[size].side}
      w={sizes[size].side}
      p={disabled || noBorder ? 0 : sizes[size].padding}
      {...props}
    />
  );
}

// function UserAvatar({
//   avatar,
//   username,
//   size = 'lg',
//   disabled = false,
//   noBorder = false
// }: UserAvatarProps) {
//   const AvatarContainer = ({ children }: { children: React.ReactNode }) => {
//     return (
//       <Box
//         sx={{
//           borderWidth: sizes[size].borderWidth,
//           borderStyle: 'solid',
//           borderColor: 'primary',
//           borderRadius: '50%',
//           border: noBorder ? 'none' : undefined,
//           margin: 0,
//           padding: sizes[size].padding,
//           height: 'fit-content',
//           width: 'fit-content',
//           svg: {
//             width: sizes[size].width,
//             height: 'auto',
//             borderRadius: '50%'
//           },
//           img: {
//             height: 'auto',
//             width: sizes[size].width,
//             borderRadius: '50%'
//           }
//         }}
//       >
//         {children}
//       </Box>
//     );
//   };

//   return (
//     <AvatarContainer>
//       {disabled ? (
//         <UserIcon bgColor="gray.200" />
//       ) : avatar ? (
//         <Image
//           src={avatar}
//           alt={`${username} avatar`}
//           fallback={<UserIcon />}
//         />
//       ) : (
//         <GuestAvatar />
//       )}
//     </AvatarContainer>
//   );
// }

export default UserAvatar;
