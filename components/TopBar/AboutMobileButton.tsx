import NextLink from 'next/link';
import { IconButton, useColorModeValue } from '@chakra-ui/react';

import InfoIcon from '@/components/Icons/InfoIcon';

function AboutMobileButton() {
  const btnColor = useColorModeValue(
    'primary-light-theme',
    'primary-dark-theme'
  );
  return (
    <IconButton
      as={NextLink}
      aria-label="To About page"
      href="/about"
      prefetch={false}
      colorScheme={btnColor}
      borderRadius="30%"
      icon={<InfoIcon boxSize={6} />}
      variant="ghost"
    />
  );
}

export default AboutMobileButton;
