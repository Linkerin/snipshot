import { useContext } from 'react';
import dynamic from 'next/dynamic';
import { Grid, GridItem, Show } from '@chakra-ui/react';

import { DeviceContext } from '@/context/DeviceContext';
import SideBarSkeleton from './Skeletons/SideBarSkeleton';
import TopBar from './TopBar/TopBar';
import Meta from '@/components/Meta/Meta';

const AddSnippetButton = dynamic(
  () => import('@/components/AddSnippetButton'),
  { ssr: false }
);
const MobileNav = dynamic(() => import('@/components/MobileNav/MobileNav'));
const MobileTopBar = dynamic(() => import('@/components/TopBar/MobileTopBar'));
const SideBar = dynamic(() => import('@/components/SideBar/SideBar'), {
  loading: () => <SideBarSkeleton />
});

function Layout({ children }: { children: React.ReactNode }) {
  const { isMobile, mobileNavHeightvh } = useContext(DeviceContext);

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
          xl: '18vw 1fr',
          '2xl': '15vw 1fr'
        }}
        h="100vh"
      >
        {/* {!isMobile && (
          <GridItem area="sidebar" zIndex={2}>
            <SideBar />
          </GridItem>
        )} */}
        <Show above="md">
          <GridItem area="sidebar" zIndex={2}>
            <SideBar />
          </GridItem>
        </Show>
        <GridItem
          cursor="default"
          maxHeight="100vh"
          height="100vh"
          px={{ base: 0, '2xl': 10 }}
        >
          <GridItem area="topbar" position="sticky" top={0} zIndex={1}>
            <Show above="md">
              <TopBar />
            </Show>
            <Show below="md">
              <MobileTopBar />
            </Show>
            {/* {isMobile ? <MobileTopBar /> : <TopBar />} */}
          </GridItem>
          <GridItem
            as="main"
            px={3}
            area="main"
            // h={
            //   isMobile
            //     ? `calc(100vh - 65px - ${mobileNavHeightvh})`
            //     : 'calc(100vh - 64px)'
            // }
            h={{
              base: `calc(100vh - 65px - ${mobileNavHeightvh})`,
              md: 'calc(100vh - 64px)'
            }}
            overflowY="scroll"
            pt={3}
            pb={2}
          >
            {children}
          </GridItem>
          {/* {isMobile && (
            <GridItem as="nav" area="nav" position="sticky" bottom="0px">
              <MobileNav />
            </GridItem>
          )} */}
          <Show below="md">
            <GridItem as="nav" area="nav" position="sticky" bottom="0px">
              <MobileNav />
            </GridItem>
          </Show>
        </GridItem>
      </Grid>
      <Show above="md">
        <AddSnippetButton />
      </Show>
      {/* {!isMobile && <AddSnippetButton />} */}
    </>
  );
}

export default Layout;
