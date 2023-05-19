import { useContext } from 'react';
import { Flex, Heading, Highlight } from '@chakra-ui/react';

import Acknowledgements from './Acknowledgements';
import { DeviceContext } from '@/context/DeviceContext';
import LegalDisclaimer from '@/components/Common/LegalDisclaimer';
import Meta from '@/components/Meta/Meta';
import SnipshotDescription from './SnipshotDescription';

export function AboutPage() {
  const { mobileNavHeightDvh } = useContext(DeviceContext);

  return (
    <>
      <Meta
        title="About · snipshot"
        description="Page about the snipshot project"
        keywords="about, information, snipshot"
        ogUrl={`${process.env.NEXT_PUBLIC_BASE_URL}/about/`}
      />
      <Flex
        as="article"
        flexDirection="column"
        alignItems="flex-start"
        justifyContent="flex-start"
        w={{ base: '100%', md: '75%', xl: '50%' }}
        px={6}
      >
        <Flex
          as="section"
          flexDirection="column"
          alignItems="flex-start"
          justifyContent="space-between"
          minHeight={{
            base: `calc(100dvh - 58px - ${mobileNavHeightDvh})`,
            md: 'calc(100dvh - 64px)'
          }}
        >
          <SnipshotDescription />
          <LegalDisclaimer my={4} />
        </Flex>

        <Flex
          as="section"
          flexDirection="column"
          alignItems="flex-start"
          justifyContent="flex-start"
          minHeight={{
            base: `calc(100dvh - 58px - ${mobileNavHeightDvh})`,
            md: 'calc(100dvh - 64px)'
          }}
        >
          <Heading textAlign="center" my={4}>
            <Highlight
              query="grateful"
              styles={{ color: 'primary', fontWeight: 'extrabold' }}
            >
              We are grateful to the following projects:
            </Highlight>
          </Heading>
          <Acknowledgements />
        </Flex>
      </Flex>
    </>
  );
}

export default AboutPage;
