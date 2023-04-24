import { useContext } from 'react';
import dynamic from 'next/dynamic';
import { Grid, GridItem, Flex, Text, useBreakpoint } from '@chakra-ui/react';

import CodeIcon from '@/components/Icons/CodeIcon';
import { DeviceContext } from '@/context/DeviceContext';
import hideScrollbarCss from '@/services/utils/hideScrollbarCss';
import Meta from '@/components/Meta/Meta';
import SnippetsList from '@/components/SnippetsList';
import PageContentWrapper from '@/components/PageContentWrapper';
import { UserPageProps } from '@/pages/users/[user]';

const MobileUserInfo = dynamic(
  () => import('@/components/UserInfo/Mobile/MobileUserInfo')
);
const UserDescription = dynamic(
  () => import('@/components/UserInfo/UserDescription/UserDescription')
);
const UserInfo = dynamic(() => import('@/components/UserInfo/UserInfo'));

const gridTempalate = {
  base: '1fr',
  md: '1fr',
  lg: '22vw 18fr 1fr',
  xl: '18vw 5fr 1fr',
  '2xl': '15vw 5fr 2fr'
};

function UserPage({
  registered,
  avatar,
  username,
  snippetsData
}: UserPageProps) {
  const breakpoint = useBreakpoint();
  const { isMobile } = useContext(DeviceContext);

  return (
    <>
      <Meta
        title={`${username} profile · snipshot`}
        description={`${username}'s profile page. Discover his snippets, description and stats there.`}
        keywords={`profile, user, ${username}, snippets`}
      />
      <Grid gridTemplateColumns={gridTempalate} pt={3}>
        {username && !isMobile && breakpoint !== 'md' && (
          <>
            <GridItem />
            <GridItem
              position="fixed"
              top="76px"
              mt={1.5}
              ml={3}
              w={{ md: '25vw', lg: '22vw', xl: '18vw', '2xl': '15vw' }}
            >
              <UserInfo
                avatar={avatar}
                username={username}
                registered={registered}
              />
              <UserDescription username={username} />
            </GridItem>
          </>
        )}
        <GridItem
          px={{ lg: 7, '2xl': 14 }}
          sx={hideScrollbarCss}
          position="relative"
        >
          {(isMobile || breakpoint === 'md') && (
            <MobileUserInfo
              avatar={avatar}
              username={username}
              registered={registered}
            />
          )}

          <PageContentWrapper>
            {!isMobile && breakpoint !== 'md' && (
              <Flex alignItems="center" mb={3} gap={1}>
                <CodeIcon boxSize={5} />
                <Text fontSize="xl">Snippets</Text>
              </Flex>
            )}
            <SnippetsList
              snippetsData={snippetsData}
              fetchUrl={`/users/${username}`}
              oneColumn
            />
          </PageContentWrapper>
        </GridItem>
      </Grid>
    </>
  );
}

export default UserPage;
