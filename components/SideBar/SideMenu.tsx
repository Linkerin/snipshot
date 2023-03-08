import { useContext } from 'react';
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
  useColorModeValue
} from '@chakra-ui/react';

import { AuthContext } from '@/context/AuthContext';
import CenteredListItem from '../CenteredListItem';
import CodeIcon from '@/components/Icons/CodeIcon';
import LanguagesList from '../LanguagesList';
import SettingsIcon from '@/components/Icons/SettingsIcon';
import SignInIcon from '@/components/Icons/SignInIcon';
import SignOutIcon from '@/components/Icons/SignOutIcon';
import UserIcon from '@/components/Icons/UserIcon';

function SideMenu() {
  const user = useContext(AuthContext);

  const handleLogOut = async (e: React.MouseEvent) => {
    const supabase = (await import('@/services/supabase')).default;
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
    <List as="menu" spacing={1}>
      {user?.id && (
        <>
          <LinkBox as={StyledMenuItem}>
            <ListIcon as={UserIcon} />
            <LinkOverlay
              as={NextLink}
              href="/profile"
              aria-label="Profile page"
            >
              Profile
            </LinkOverlay>
          </LinkBox>
          <LinkBox as={StyledMenuItem}>
            <ListIcon as={SettingsIcon} />
            <LinkOverlay as={NextLink} href="#" aria-label="Settings page">
              Settings
            </LinkOverlay>
          </LinkBox>
        </>
      )}

      {!user?.id && (
        <LinkBox as={StyledMenuItem}>
          <ListIcon as={SignInIcon} />
          <LinkOverlay as={NextLink} href="/login" aria-label="Settings page">
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
            <AccordionPanel maxHeight="40vh" overflowY="scroll" ml={5}>
              <LanguagesList />
            </AccordionPanel>
          </AccordionItem>
        </Accordion>
      </CenteredListItem>

      {user?.id && (
        <StyledMenuItem>
          <Box as="button" onClick={handleLogOut}>
            <ListIcon as={SignOutIcon} />
            Logout
          </Box>
        </StyledMenuItem>
      )}
    </List>
  );
}

export default SideMenu;
