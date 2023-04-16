import { useContext } from 'react';
import dynamic from 'next/dynamic';
import { Grid, GridItem, Flex, Text } from '@chakra-ui/react';

import CodeIcon from '@/components/Icons/CodeIcon';
import { DeviceContext } from '@/context/DeviceContext';
import hideScrollbarCss from '@/services/utils/hideScrollbarCss';
import Meta from '@/components/Meta/Meta';
import SnippetsList from '@/components/SnippetsList';
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
  md: '25vw 20fr 1fr',
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
  const { isMobile, mobileNavHeightvh } = useContext(DeviceContext);

  return (
    <>
      <Meta
        title={`${username} profile · snipshot`}
        description="Post a code snippet to snipshot on this page"
        keywords={`profile, user, ${username}, snippets`}
      />
      <Grid gridTemplateColumns={gridTempalate}>
        {username && !isMobile && (
          <>
            <GridItem />
            <GridItem
              mt={1.5}
              position="fixed"
              top="76px"
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
          px={{ sm: 0, lg: 7, '2xl': 14 }}
          h={
            isMobile
              ? `calc(100vh - 85px - ${mobileNavHeightvh})`
              : 'calc(100vh - 76px'
          }
          overflowY="scroll"
          sx={hideScrollbarCss}
        >
          {isMobile && (
            <MobileUserInfo
              avatar={avatar}
              username={username}
              registered={registered}
            />
          )}

          {!isMobile && (
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
        </GridItem>
      </Grid>
    </>
  );
}

export default UserPage;
