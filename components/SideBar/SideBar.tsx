import { Card, CardBody, CardHeader, Center } from '@chakra-ui/react';

import Logo from '../Logo';
import SideMenu from './SideMenu';
import UserAvatar from '../Avatars/UserAvatar';

function SideBar() {
  return (
    <Card h="100vh" borderRadius="0 10px 10px 0">
      <CardHeader as="header" p={2}>
        <Logo isLink />
      </CardHeader>
      <CardBody width="100%" pr={0} pl={2}>
        <Center mb={5}>
          <UserAvatar />
        </Center>
        <SideMenu />
      </CardBody>
    </Card>
  );
}

export default SideBar;
