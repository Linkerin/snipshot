import React from 'react';
import Image from 'next/image';
import NextLink from 'next/link';
import { Box, SystemStyleObject, useColorModeValue } from '@chakra-ui/react';

import LogoLight from '../public/Logo_light.svg';
import LogoDark from '../public/Logo_dark.svg';

interface LogoProps {
  height?: number;
  isLink?: boolean;
}

interface LogoContainerProps extends LogoProps {
  children: React.ReactElement;
}

const LogoContainer = ({ children, height, isLink }: LogoContainerProps) => {
  const containerStyling: SystemStyleObject = {
    img: { height: height ?? 50, width: 'auto' }
  };

  return (
    <Box sx={containerStyling}>
      {isLink ? (
        <NextLink href="/" aria-label="Link to the main page">
          {children}
        </NextLink>
      ) : (
        children
      )}
    </Box>
  );
};

interface LogoProps {
  height?: number;
  isLink?: boolean;
}

function Logo({ isLink, height }: LogoProps) {
  const logo = useColorModeValue(LogoLight, LogoDark);

  return (
    <LogoContainer height={height} isLink={isLink}>
      <Image src={logo} alt="snipshot logo" />
    </LogoContainer>
  );
}

export default Logo;
