import { useContext } from 'react';
import { IconButton } from '@chakra-ui/react';

import { AuthContext } from '@/context/AuthContext';
import SignOutIcon from '@/components/Icons/SignOutIcon';
import useLogout from '@/hooks/useLogout';

function MobileLogoutBtn({ username }: { username: string | undefined }) {
  const user = useContext(AuthContext);
  const handleLogout = useLogout();
  return username === user?.username ? (
    <IconButton
      aria-label="Logout"
      icon={<SignOutIcon />}
      variant="ghost"
      size="lg"
      onClick={handleLogout}
    />
  ) : (
    <></>
  );
}

export default MobileLogoutBtn;
