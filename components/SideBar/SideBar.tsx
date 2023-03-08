import { useContext } from 'react';
import { Card, CardBody, CardHeader, Center, Heading } from '@chakra-ui/react';

import { AuthContext } from '@/context/AuthContext';
import Logo from '../Logo';
import SideMenu from './SideMenu';
import UserAvatar from '@/components/Avatars/UserAvatar';

function SideBar() {
  const user = useContext(AuthContext);

  return (
    <Card h="100vh" borderRadius="0 10px 10px 0">
      <CardHeader as="header" p={2}>
        <Logo isLink />
      </CardHeader>
      <CardBody width="100%" pr={0} pl={2}>
        <Center mb={5} flexDirection="column">
          <UserAvatar />
          <Heading
            as="h2"
            fontSize="1.6rem"
            fontWeight="medium"
            mt={1}
            cursor="default"
          >
            {user?.username ?? 'Hello, Guest!'}
          </Heading>
        </Center>
        <SideMenu />
      </CardBody>
    </Card>
  );
}

export default SideBar;
