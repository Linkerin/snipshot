import { useCallback, useContext, useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';
import { ButtonGroup, Card, CardBody, IconButton } from '@chakra-ui/react';

import { AuthContext } from '@/context/AuthContext';
import CodeIcon from '@/components/Icons/CodeIcon';
import { DeviceContext } from '@/context/DeviceContext';
import HomeIcon from '@/components/Icons/HomeIcon';
import PlusIcon from '@/components/Icons/PlusIcon';
import SearchIcon from '@/components/Icons/SearchIcon';
import UserIcon from '@/components/Icons/UserIcon';

const LanguagesList = dynamic(
  () => import('@/components/LanguagesList/LanguagesList'),
  { ssr: false }
);
const MobileNavModal = dynamic(() => import('./MobileNavModal'), {
  ssr: false
});
const MobileSearchContainer = dynamic(() => import('./MobileSearchContainer'), {
  ssr: false
});
const UserAvatar = dynamic(
  () => import('@/components/UserInfo/Avatars/UserAvatar')
);

const openedDefaultState = {
  languages: false,
  search: false
};

function MobileNav() {
  const [opened, setOpened] = useState(openedDefaultState);
  const { isAppleMobile, mobileNavHeightDvh } = useContext(DeviceContext);
  const [user] = useContext(AuthContext);

  const router = useRouter();

  const handleMenuClick = useCallback(
    (value: string) => {
      switch (value) {
        case 'home':
          if (typeof window !== 'undefined') {
            router.push('/');
          }
          break;

        case 'profile':
          if (typeof window !== 'undefined') {
            router.push(user?.username ? `/users/${user.username}` : '/login');
          }
          break;

        case 'add':
          if (typeof window !== 'undefined') {
            router.push('/add');
          }
          break;

        default:
          router.push(router.pathname, `${router.asPath}#${value}`, {
            shallow: true
          });
          break;
      }
    },
    [router, user?.username]
  );

  const handleMenuClose = useCallback(() => {
    router.push({ pathname: router.pathname, query: router.query }, undefined, {
      shallow: true
    });
  }, [router]);

  useEffect(() => {
    // Close all opened modals when a route changes
    setOpened(prevState => {
      if (Object.values(prevState).includes(true)) {
        return openedDefaultState;
      }
      return prevState;
    });

    const splittedUrl = router.asPath.split('#');
    const lastUrlQuery = splittedUrl[splittedUrl.length - 1];

    // Check the necessity of opening a modal
    if (['languages', 'search'].includes(lastUrlQuery)) {
      setOpened(prevState => {
        return { ...prevState, [lastUrlQuery]: true };
      });
    }
  }, [router]);

  return (
    <>
      <Card borderRadius={0} bg="chakra-body-bg">
        <CardBody p={0}>
          <ButtonGroup
            h={mobileNavHeightDvh}
            w="100%"
            spacing={0}
            isAttached
            pb={isAppleMobile ? '1.5dvh' : 0}
            variant="ghost"
          >
            <IconButton
              aria-label="To homepage"
              role="link"
              icon={<HomeIcon boxSize={5} />}
              w="100%"
              h="100%"
              onClick={() => handleMenuClick('home')}
            />

            <IconButton
              w="100%"
              h="100%"
              aria-label="Search modal"
              icon={<SearchIcon boxSize={5} />}
              onClick={() => handleMenuClick('search')}
            />
            <IconButton
              aria-label="To add snippet page"
              role="link"
              icon={<PlusIcon boxSize={6} color="primary" />}
              w="100%"
              h="100%"
              onClick={() => handleMenuClick('add')}
            />
            <IconButton
              aria-label="Languages list modal"
              icon={<CodeIcon boxSize={5} />}
              w="100%"
              h="100%"
              value={'test'}
              onClick={() => handleMenuClick('languages')}
            />
            <IconButton
              aria-label="To profile page"
              role="link"
              icon={
                user?.id ? (
                  <UserAvatar
                    avatar={user.avatar}
                    username={user.username}
                    size="micro"
                  />
                ) : (
                  <UserIcon boxSize={5} />
                )
              }
              w="100%"
              h="100%"
              onClick={() => handleMenuClick('profile')}
            />
          </ButtonGroup>
        </CardBody>
      </Card>
      <MobileNavModal isOpen={opened.search} onClose={handleMenuClose}>
        <MobileSearchContainer />
      </MobileNavModal>
      <MobileNavModal isOpen={opened.languages} onClose={handleMenuClose}>
        <LanguagesList role="navigation" />
      </MobileNavModal>
    </>
  );
}

export default MobileNav;
