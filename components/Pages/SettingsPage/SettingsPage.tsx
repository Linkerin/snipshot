import NextLink from 'next/link';
import {
  Divider,
  Flex,
  Heading,
  LinkBox,
  LinkOverlay,
  Show
} from '@chakra-ui/react';

import ChangeUsername from './ChangeUsername';
import DeleteUser from './DeleteUser';
import InfoIcon from '@/components/Icons/InfoIcon';
import PageContentWrapper from '@/components/PageContentWrapper';

function SettingsPage() {
  return (
    <PageContentWrapper
      as={Flex}
      flexDirection="column"
      gap={{ base: 3, lg: 5 }}
      w={{ base: '100%', lg: '80%' }}
    >
      <Heading as="h1" size="lg" fontWeight="medium">
        Settings
      </Heading>
      <Divider />
      <ChangeUsername />
      <Divider />
      <DeleteUser />
      <Show below="md">
        <Divider />
        <LinkBox
          as={Flex}
          alignItems="center"
          gap={1.5}
          _hover={{ color: 'primary' }}
        >
          <InfoIcon boxSize={5} />
          <LinkOverlay
            as={NextLink}
            href="/about"
            aria-label="About page"
            fontSize="lg"
            fontWeight="bold"
          >
            About snipshot
          </LinkOverlay>
        </LinkBox>
      </Show>
    </PageContentWrapper>
  );
}

export default SettingsPage;
