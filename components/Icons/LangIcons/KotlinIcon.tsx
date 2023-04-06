import { Icon, IconProps } from '@chakra-ui/react';

interface LangIconProps extends IconProps {
  disabled?: boolean;
}

function KotlinIcon(props: LangIconProps) {
  return (
    <Icon viewBox="0 0 128 128" boxSize={7} {...props}>
      <g fill={props.disabled ? '#bbb' : '#7F6CB1'}>
        <path d="M0 0h61.4L0 60.4zM0 128L128 0H64.6L0 63.7zM128 128L64.6 66.6 3.3 128z"></path>
      </g>
    </Icon>
  );
}

export default KotlinIcon;
