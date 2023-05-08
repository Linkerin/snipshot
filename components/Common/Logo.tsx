import Image from 'next/image';
import {
  Box,
  Link,
  SystemStyleObject,
  useColorModeValue
} from '@chakra-ui/react';

import fadeInAnimation from '@/services/utils/styling/fadeInAnimation';
import LogoDark from '@/public/images/LogoDark.svg';
import LogoLight from '@/public/images/LogoLight.svg';

interface LogoProps {
  height?: number;
  isLink?: boolean;
  sx?: SystemStyleObject;
}

interface LogoContainerProps extends LogoProps {
  children: React.ReactElement;
}

const LogoContainer = ({
  children,
  height,
  isLink,
  sx
}: LogoContainerProps) => {
  const containerStyling: SystemStyleObject = {
    img: { height: height ?? 50, width: 'auto' },
    ...sx
  };

  return (
    <Box sx={containerStyling}>
      {isLink ? (
        <Link href="/" aria-label="Link to the main page">
          {children}
        </Link>
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
    <LogoContainer height={height} isLink={isLink} sx={fadeInAnimation()}>
      <Image src={logo} alt="snipshot logo" />
    </LogoContainer>
  );
}

export default Logo;
