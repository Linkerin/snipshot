import { useContext } from 'react';
import { Card, CardBody, CardHeader, Center } from '@chakra-ui/react';

import { AuthContext } from '@/context/AuthContext';
import Logo from '../Logo';
import SideMenu from './SideMenu';
import UserInfo from '@/components/UserInfo/UserInfo';

function SideBar() {
  const user = useContext(AuthContext);

  return (
    <Card h="100vh" borderRadius="0 10px 10px 0" overflowY="scroll">
      <CardHeader as="header" p={2}>
        <Logo isLink />
      </CardHeader>
      <CardBody width="100%" mt={4} px={2} py={0}>
        <Center mb={5} flexDirection="column">
          <UserInfo
            avatar={user?.avatar}
            username={user?.username}
            userId={user?.id}
          />
        </Center>
        <SideMenu />
      </CardBody>
    </Card>
  );
}

export default SideBar;
