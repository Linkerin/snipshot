import { Icon, IconProps } from '@chakra-ui/react';

function MoreDotsIcon(props: IconProps) {
  return (
    <Icon viewBox="0 0 24 24" aria-hidden {...props}>
      <path
        fill="currentColor"
        d="M12,10a2,2,0,1,0,2,2A2,2,0,0,0,12,10ZM5,10a2,2,0,1,0,2,2A2,2,0,0,0,5,10Zm14,0a2,2,0,1,0,2,2A2,2,0,0,0,19,10Z"
      ></path>
    </Icon>
  );
}

export default MoreDotsIcon;
