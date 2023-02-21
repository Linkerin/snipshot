import NextLink from 'next/link';
import {
  chakra,
  Accordion,
  AccordionButton,
  AccordionItem,
  AccordionPanel,
  LinkBox,
  LinkOverlay,
  List,
  ListIcon,
  useColorModeValue
} from '@chakra-ui/react';

import CenteredListItem from '../CenteredListItem';
import CodeIcon from '@/components/Icons/CodeIcon';
import LanguagesList from '../LanguagesList';
import SettingsIcon from '@/components/Icons/SettingsIcon';
import SignOutIcon from '@/components/Icons/SignOutIcon';
import UserIcon from '@/components/Icons/UserIcon';

function SideMenu() {
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
    <List as="menu" spacing={2}>
      <LinkBox as={StyledMenuItem}>
        <ListIcon as={UserIcon} />
        <LinkOverlay as={NextLink} href="/profile" aria-label="Profile page">
          Profile
        </LinkOverlay>
      </LinkBox>
      <LinkBox as={StyledMenuItem}>
        <ListIcon as={SettingsIcon} />
        <LinkOverlay as={NextLink} href="#" aria-label="Settings page">
          Settings
        </LinkOverlay>
      </LinkBox>
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
      <LinkBox as={StyledMenuItem}>
        <ListIcon as={SignOutIcon} />
        <LinkOverlay as={NextLink} href="/logout" aria-label="Logout">
          Logout
        </LinkOverlay>
      </LinkBox>
    </List>
  );
}

export default SideMenu;
