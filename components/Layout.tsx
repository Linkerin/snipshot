import { useContext } from 'react';
import { Grid, GridItem } from '@chakra-ui/react';

import AddSnippetButton from '@/components/AddSnippetButton';
import { DeviceContext } from '@/context/DeviceContext';
import Meta from '@/components/Meta/Meta';
import SideBar from '@/components/SideBar/SideBar';
import TopBar from '@/components/TopBar/TopBar';

function Layout({ children }: { children: React.ReactNode }) {
  const { isMobile } = useContext(DeviceContext);

  return (
    <>
      <Meta />
      <Grid
        gridTemplateColumns={{ base: '1fr', md: '25vw 1fr', lg: '18vw 1fr' }}
      >
        {!isMobile && (
          <GridItem>
            <SideBar />
          </GridItem>
        )}
        <GridItem pb={3} pl={1} height="100vh" overflowY="scroll">
          {!isMobile && <TopBar />}
          <GridItem as="main" px={3}>
            {children}
          </GridItem>
        </GridItem>
        {!isMobile && <AddSnippetButton />}
      </Grid>
    </>
  );
}

export default Layout;
