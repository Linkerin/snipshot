import { useContext } from 'react';
import dynamic from 'next/dynamic';
import { Grid, GridItem } from '@chakra-ui/react';

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
  const templateAreas = isMobile
    ? `"topbar"
       "main"
       "nav"`
    : `"sidebar topbar"
       "sidebar main"`;

  return (
    <>
      <Meta />
      <Grid
        templateAreas={templateAreas}
        gridTemplateColumns={{
          base: '1fr',
          md: '25vw 1fr',
          lg: '22vw 1fr',
          xl: '18vw 1fr',
          '2xl': '15vw 1fr'
        }}
        h="100%"
      >
        {!isMobile && (
          <GridItem area="sidebar" zIndex={2}>
            <SideBar />
          </GridItem>
        )}
        <GridItem
          cursor="default"
          maxHeight="100dvh"
          height="100%"
          px={{ base: 0, '2xl': 10 }}
        >
          <GridItem area="topbar" position="sticky" top={0} zIndex={1}>
            {isMobile ? <MobileTopBar /> : <TopBar />}
          </GridItem>
          <GridItem
            as="main"
            area="main"
            h={{
              base: `calc(100dvh - 65px - ${mobileNavHeightvh})`,
              md: 'calc(100dvh - 64px)'
            }}
            overflowY="scroll"
            pl={3}
            pr={1}
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
