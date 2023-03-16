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
        templateAreas={`"sidebar topbar"
                        "sidebar main"`}
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
        <GridItem
          cursor="default"
          maxHeight="100vh"
          height="100vh"
          overflowY="scroll"
        >
          <GridItem area="topbar" position="sticky" top={0} zIndex={1}>
            {!isMobile && <TopBar />}
          </GridItem>
          <GridItem as="main" px={3} area="main" h="calc(100% - 76px)">
            {children}
          </GridItem>
        </GridItem>
        {!isMobile && <AddSnippetButton />}
      </Grid>
    </>
  );
}

export default Layout;
