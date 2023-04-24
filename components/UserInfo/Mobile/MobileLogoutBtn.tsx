import { IconButton } from '@chakra-ui/react';

import SignOutIcon from '@/components/Icons/SignOutIcon';
import useLogout from '@/hooks/useLogout';

function MobileLogoutBtn() {
  const handleLogout = useLogout();
  return (
    <IconButton
      aria-label="Logout"
      icon={<SignOutIcon />}
      variant="ghost"
      size="lg"
      onClick={handleLogout}
    />
  );
}

export default MobileLogoutBtn;
