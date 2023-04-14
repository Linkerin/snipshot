import { useContext } from 'react';
import dynamic from 'next/dynamic';
import NextLink from 'next/link';
import {
  chakra,
  Accordion,
  AccordionButton,
  AccordionItem,
  AccordionPanel,
  Box,
  LinkBox,
  LinkOverlay,
  List,
  ListIcon,
  useColorModeValue,
  Divider
} from '@chakra-ui/react';

import { AuthContext } from '@/context/AuthContext';
import CenteredListItem from '../CenteredListItem';
import CodeIcon from '@/components/Icons/CodeIcon';
import { hideScrollbarCss } from '@/services/utils';
import InfoIcon from '../Icons/InfoIcon';
import SettingsIcon from '@/components/Icons/SettingsIcon';
import SignInIcon from '@/components/Icons/SignInIcon';
import SignOutIcon from '@/components/Icons/SignOutIcon';
import UserIcon from '@/components/Icons/UserIcon';

const LanguagesList = dynamic(() => import('@/components/LanguagesList'));

function SideMenu() {
  const user = useContext(AuthContext);

  const handleLogOut = async (e: React.MouseEvent) => {
    const supabase = (await import('@/services/supabase/supabase')).default;
    const { error } = await supabase.auth.signOut();

    if (error) {
      console.error(error.message);
    }
  };

  const menuItemHoverColor = useColorModeValue(
    'blackAlpha.50',
    'whiteAlpha.200'
  );
  const menuItemStyles = {
    baseStyle: {
      px: 4,
      py: 2,
      _hover: {
        bg: menuItemHoverColor
      }
    }
  };
  const StyledMenuItem = chakra(CenteredListItem, menuItemStyles);

  return (
    <List as="menu" spacing={0}>
      {user?.id && (
        <>
          <LinkBox as={StyledMenuItem}>
            <ListIcon as={UserIcon} />
            <LinkOverlay
              as={NextLink}
              href={`/users/${user?.username}`}
              aria-label="Profile page"
              prefetch={false}
            >
              Profile
            </LinkOverlay>
          </LinkBox>
          {/* <LinkBox as={StyledMenuItem}>
            <ListIcon as={SettingsIcon} />
            <LinkOverlay as={NextLink} href="#" aria-label="Settings page">
              Settings
            </LinkOverlay>
          </LinkBox> */}
        </>
      )}

      {!user?.id && (
        <LinkBox as={StyledMenuItem}>
          <ListIcon as={SignInIcon} />
          <LinkOverlay
            as={NextLink}
            href="/login"
            aria-label="Settings page"
            prefetch={false}
          >
            Sign In
          </LinkOverlay>
        </LinkBox>
      )}

      <CenteredListItem>
        <Accordion allowToggle w="100%">
          <AccordionItem border="none">
            <AccordionButton>
              <ListIcon as={CodeIcon} />
              Languages
            </AccordionButton>
            <AccordionPanel
              maxHeight="35vh"
              overflowY="scroll"
              ml={7}
              p={0}
              sx={hideScrollbarCss}
            >
              <LanguagesList />
            </AccordionPanel>
          </AccordionItem>
        </Accordion>
      </CenteredListItem>

      <LinkBox as={StyledMenuItem}>
        <ListIcon as={InfoIcon} />
        <LinkOverlay
          as={NextLink}
          href="/about"
          aria-label="About page"
          prefetch={false}
        >
          About
        </LinkOverlay>
      </LinkBox>

      {user?.id && (
        <>
          <Divider my={2} w="87%" mx="auto" />
          <StyledMenuItem onClick={handleLogOut} cursor="pointer">
            <Box as="button">
              <ListIcon as={SignOutIcon} />
              Logout
            </Box>
          </StyledMenuItem>
        </>
      )}
    </List>
  );
}

export default SideMenu;
