import { useContext } from 'react';
import { Grid, GridItem } from '@chakra-ui/react';

import AddSnippetButton from '@/components/AddSnippetButton';
import { DeviceContext } from '@/context/DeviceContext';
import Meta from '@/components/Meta/Meta';
import MobileNav from '@/components/MobileNav/MobileNav';
import MobileTopBar from './TopBar/MobileTopBar';
import SideBar from '@/components/SideBar/SideBar';
import TopBar from '@/components/TopBar/TopBar';

function Layout({ children }: { children: React.ReactNode }) {
  const { isMobile, isAppleMobile } = useContext(DeviceContext);

  return (
    <>
      <Meta />
      <Grid
        templateAreas={{
          base: `"topbar"
                 "main"
                 "nav"`,
          md: `"sidebar topbar"
               "sidebar main"`
        }}
        gridTemplateColumns={{
          base: '1fr',
          md: '25vw 1fr',
          lg: '22vw 1fr',
          xl: '18vw 1fr'
        }}
        h="100vh"
      >
        {!isMobile && (
          <GridItem area="sidebar" zIndex={2}>
            <SideBar />
          </GridItem>
        )}
        <GridItem cursor="default" maxHeight="100vh" height="100vh">
          <GridItem area="topbar" position="sticky" top={0} zIndex={1}>
            {isMobile ? <MobileTopBar /> : <TopBar />}
          </GridItem>
          <GridItem
            as="main"
            px={3}
            area="main"
            h={
              isMobile
                ? `calc(100vh - 65px - ${isAppleMobile ? '8.5vh' : '7vh'})`
                : 'calc(100vh - 64px)'
            }
            overflowY="scroll"
            pt={3}
            pb={2}
          >
            {children}
          </GridItem>
          {isMobile && (
            <GridItem as="nav" area="nav" position="sticky" bottom="0px">
              <MobileNav />
            </GridItem>
          )}
        </GridItem>
      </Grid>
      {!isMobile && <AddSnippetButton />}
    </>
  );
}

export default Layout;
