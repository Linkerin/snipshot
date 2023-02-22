import { Grid, GridItem } from '@chakra-ui/react';

import Meta from '@/components/Meta/Meta';
import SideBar from '@/components/SideBar/SideBar';

function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Meta />
      <Grid gridTemplateColumns={'18vw 1fr'}>
        <GridItem>
          <SideBar />
        </GridItem>
        <GridItem as="main" px={3} py={3} height="100vh" overflowY="scroll">
          {children}
        </GridItem>
      </Grid>
    </>
  );
}

export default Layout;
