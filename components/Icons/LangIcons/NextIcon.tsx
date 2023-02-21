import { Icon, IconProps, useColorMode } from '@chakra-ui/react';

interface LangIconProps extends IconProps {
  disabled?: boolean;
}

function NextIcon(props: LangIconProps) {
  const { colorMode } = useColorMode();

  if (props.disabled) {
    return (
      <Icon viewBox="0 0 128 128" boxSize={7} {...props}>
        <path
          fill="#bbb"
          d="M64 0C28.7 0 0 28.7 0 64s28.7 64 64 64 64-28.7 64-64S99.3 0 64 0zm32.7 114.4L48.4 41.8h-6.8v50.1h6.8V55.3l44.2 61.5c-8.5 4.6-18.2 7.2-28.6 7.2-33.2.1-60.1-26.8-60.1-60S30.8 3.9 64 3.9s60.1 26.9 60.1 60.1c0 21.1-10.9 39.7-27.4 50.4z"
        ></path>
        <path fill="#fafdfa" d="M78.6 73.3l7.5 11.3V41.8h-7.5z"></path>
      </Icon>
    );
  }

  return (
    <Icon viewBox="0 0 128 128" boxSize={7} {...props}>
      {colorMode === 'light' ? (
        <path
          fill="#000"
          d="M64 0C28.7 0 0 28.7 0 64s28.7 64 64 64c11.2 0 21.7-2.9 30.8-7.9L48.4 55.3v36.6h-6.8V41.8h6.8l50.5 75.8C116.4 106.2 128 86.5 128 64c0-35.3-28.7-64-64-64zm22.1 84.6l-7.5-11.3V41.8h7.5v42.8z"
        ></path>
      ) : (
        <>
          <path
            fill="#fafdfa"
            d="M64 0C28.7 0 0 28.7 0 64s28.7 64 64 64 64-28.7 64-64S99.3 0 64 0zm32.7 114.4L48.4 41.8h-6.8v50.1h6.8V55.3l44.2 61.5c-8.5 4.6-18.2 7.2-28.6 7.2-33.2.1-60.1-26.8-60.1-60S30.8 3.9 64 3.9s60.1 26.9 60.1 60.1c0 21.1-10.9 39.7-27.4 50.4z"
          ></path>
          <path fill="#fafdfa" d="M78.6 73.3l7.5 11.3V41.8h-7.5z"></path>
        </>
      )}
    </Icon>
  );
}

export default NextIcon;
