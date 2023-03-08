import { useContext } from 'react';
import { Grid, GridItem } from '@chakra-ui/react';

import AddSnippetButton from '@/components/Snippet/AddSnippetButton';
import { DeviceContext } from '@/context/DeviceContext';
import Meta from '@/components/Meta/Meta';
import SideBar from '@/components/SideBar/SideBar';

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
        <GridItem as="main" px={3} py={3} height="100vh" overflowY="scroll">
          {children}
        </GridItem>
        {!isMobile && <AddSnippetButton />}
      </Grid>
    </>
  );
}

export default Layout;
