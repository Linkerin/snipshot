import { Divider, Flex, Heading, Link, Show } from '@chakra-ui/react';

import ChangeUsername from './ChangeUsername';
import DeleteUser from './DeleteUser';
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
        <Link href="/about" aria-label="About page" fontSize="xl">
          About snipshot
        </Link>
      </Show>
    </PageContentWrapper>
  );
}

export default SettingsPage;
