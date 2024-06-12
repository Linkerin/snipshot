import { useContext } from 'react';
import dynamic from 'next/dynamic';
import { Grid, GridItem } from '@chakra-ui/react';
import { Roboto_Flex } from 'next/font/google';

import { DeviceContext } from '@/context/DeviceContext';
import hideScrollbarCss from '@/services/utils/hideScrollbarCss';
import Meta from '@/components/Meta/Meta';
import SideBarSkeleton from './Skeletons/SideBarSkeleton';
import TopBar from './TopBar/TopBar';
import useCookiesConsent from '@/hooks/useCookiesConsent';

const roboto = Roboto_Flex({ subsets: ['latin-ext'] });

const AddSnippetButton = dynamic(
  () => import('@/components/AddSnippetButton'),
  { ssr: false }
);
const CookiesConsentPortal = dynamic(() => import('./CookiesConsentPortal'), {
  ssr: false
});
const MobileNav = dynamic(() => import('@/components/MobileNav/MobileNav'));
const MobileTopBar = dynamic(() => import('@/components/TopBar/MobileTopBar'));
const SideBar = dynamic(() => import('@/components/SideBar/SideBar'), {
  loading: () => <SideBarSkeleton />
});

function Layout({ children }: { children: React.ReactNode }) {
  const { isMobile, mobileNavHeightDvh } = useContext(DeviceContext);

  const { showConsent, acceptCookiesHandler } = useCookiesConsent();
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
        className={roboto.className}
        h="100%"
      >
        {!isMobile && (
          <GridItem as="aside" area="sidebar" zIndex={4}>
            <SideBar />
          </GridItem>
        )}
        <GridItem
          cursor="default"
          maxHeight="100dvh"
          height="100%"
          px={{ base: 0, '2xl': 10 }}
        >
          <GridItem
            as="header"
            area="topbar"
            aria-label="Topbar"
            position="sticky"
            top={0}
            zIndex={3}
          >
            {isMobile ? <MobileTopBar /> : <TopBar />}
          </GridItem>
          <GridItem
            as="main"
            area="main"
            h={{
              base: `calc(100dvh - 58px - ${mobileNavHeightDvh})`,
              md: 'calc(100dvh - 64px)'
            }}
            overflowY="scroll"
            sx={hideScrollbarCss}
            pb={2}
          >
            {children}
          </GridItem>
          {isMobile && (
            <GridItem
              as="nav"
              area="nav"
              role="menubar"
              position="sticky"
              bottom="0px"
            >
              <MobileNav />
            </GridItem>
          )}
        </GridItem>
      </Grid>
      {!isMobile && <AddSnippetButton />}
      <CookiesConsentPortal show={showConsent} onClose={acceptCookiesHandler} />
    </>
  );
}

export default Layout;
