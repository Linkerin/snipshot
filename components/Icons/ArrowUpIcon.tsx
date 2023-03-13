import { Icon, IconProps } from '@chakra-ui/react';

function ArrowUpIcon(props: IconProps) {
  return (
    <Icon viewBox="0 0 24 24" aria-hidden {...props}>
      <path
        fill="currentColor"
        d="M17,13.41,12.71,9.17a1,1,0,0,0-1.42,0L7.05,13.41a1,1,0,0,0,0,1.42,1,1,0,0,0,1.41,0L12,11.29l3.54,3.54a1,1,0,0,0,.7.29,1,1,0,0,0,.71-.29A1,1,0,0,0,17,13.41Z"
      />
    </Icon>
  );
}

export default ArrowUpIcon;
