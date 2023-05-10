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
  useColorModeValue,
  Divider
} from '@chakra-ui/react';

import { AuthContext } from '@/context/AuthContext';
import CenteredListItem from '@/components/Common/CenteredListItem';
import CodeIcon from '@/components/Icons/CodeIcon';
import InfoIcon from '@/components/Icons/InfoIcon';
import LanguagesList from '@/components/LanguagesList/LanguagesList';
import SettingsIcon from '@/components/Icons/SettingsIcon';
import SignInIcon from '@/components/Icons/SignInIcon';
import SignOutIcon from '@/components/Icons/SignOutIcon';
import UserIcon from '@/components/Icons/UserIcon';
import useLogout from '@/hooks/useLogout';

function SideMenu() {
  const [user] = useContext(AuthContext);
  const handleLogout = useLogout();

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
              aria-label="Profile page"
              href={`/users/${user?.username}`}
            >
              Profile
            </LinkOverlay>
          </LinkBox>
          {user?.id && (
            <LinkBox as={StyledMenuItem}>
              <ListIcon as={SettingsIcon} />
              <LinkOverlay
                as={NextLink}
                aria-label="Settings page"
                href="/settings"
                prefetch={false}
              >
                Settings
              </LinkOverlay>
            </LinkBox>
          )}
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
            <AccordionPanel maxHeight="35vh" overflowY="scroll" ml={7} p={0}>
              <LanguagesList role="link" />
            </AccordionPanel>
          </AccordionItem>
        </Accordion>
      </CenteredListItem>

      <LinkBox as={StyledMenuItem}>
        <ListIcon as={InfoIcon} />
        <LinkOverlay
          as={NextLink}
          aria-label="About page"
          href="/about"
          prefetch={false}
        >
          About
        </LinkOverlay>
      </LinkBox>

      {user?.id && (
        <>
          <Divider my={2} w="87%" mx="auto" />
          <StyledMenuItem onClick={handleLogout} cursor="pointer">
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
