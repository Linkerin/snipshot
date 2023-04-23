import NextLink from 'next/link';
import { Flex, Heading, Link, Show } from '@chakra-ui/react';

import ChangeUsername from './ChangeUsername';
import PageContentWrapper from '@/components/PageContentWrapper';
import useAuth from '@/hooks/useAuth';

function SettingsPage() {
  const user = useAuth();
  return (
    <PageContentWrapper
      as={Flex}
      flexDirection="column"
      gap={4}
      w={{ base: '100%', lg: '80%' }}
    >
      <Heading as="h1" size="lg" fontWeight="medium">
        Settings
      </Heading>
      <ChangeUsername />
      <Show below="md">
        <Link as={NextLink} href="/about" aria-label="About page">
          About snipshot
        </Link>
      </Show>
    </PageContentWrapper>
  );
}

export default SettingsPage;
