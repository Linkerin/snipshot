import { Icon, IconProps, useColorMode } from '@chakra-ui/react';

interface LangIconProps extends IconProps {
  disabled?: boolean;
}

function HaskellIcon(props: LangIconProps) {
  const { colorMode } = useColorMode();

  if (props.disabled) {
    return (
      <Icon viewBox="0 0 128 128" boxSize={7} {...props}>
        <path
          fill="#bbb"
          d="M0 110.2L30.1 65 0 19.9h22.6L52.7 65l-30.1 45.1H0z"
        ></path>
        <path
          fill="#bbb"
          d="M30.1 110.2L60.2 65 30.1 19.9h22.6l60.2 90.3H90.4L71.5 81.9l-18.8 28.2H30.1zM102.9 83.8l-10-15.1H128v15.1h-25.1zM87.8 61.3l-10-15.1H128v15.1H87.8z"
        ></path>
      </Icon>
    );
  }

  return (
    <Icon viewBox="0 0 128 128" boxSize={7} {...props}>
      {colorMode === 'light' ? (
        <>
          <path
            fill="#463B63"
            d="M0 110.2L30.1 65 0 19.9h22.6L52.7 65l-30.1 45.1H0z"
          ></path>
          <path
            fill="#5E5187"
            d="M30.1 110.2L60.2 65 30.1 19.9h22.6l60.2 90.3H90.4L71.5 81.9l-18.8 28.2H30.1z"
          ></path>
          <path
            fill="#904F8C"
            d="M102.9 83.8l-10-15.1H128v15.1h-25.1zM87.8 61.3l-10-15.1H128v15.1H87.8z"
          ></path>
        </>
      ) : (
        <>
          <path
            fill="#fafdfa"
            d="M0 110.2L30.1 65 0 19.9h22.6L52.7 65l-30.1 45.1H0z"
          ></path>
          <path
            fill="#fafdfa"
            d="M30.1 110.2L60.2 65 30.1 19.9h22.6l60.2 90.3H90.4L71.5 81.9l-18.8 28.2H30.1zM102.9 83.8l-10-15.1H128v15.1h-25.1zM87.8 61.3l-10-15.1H128v15.1H87.8z"
          ></path>
        </>
      )}
    </Icon>
  );
}

export default HaskellIcon;
