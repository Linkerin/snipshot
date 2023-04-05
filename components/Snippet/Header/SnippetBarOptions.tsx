import { useCallback, useContext } from 'react';
import dynamic from 'next/dynamic';
import {
  IconButton,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  SystemStyleObject,
  useDisclosure,
  useToast
} from '@chakra-ui/react';

import { AuthContext } from '@/context/AuthContext';
import DeleteIcon from '@/components/Icons/DeleteIcon';
import EditIcon from '@/components/Icons/EditIcon';
import ExclamationIcon from '@/components/Icons/ExclamationIcon';
import MoreDotsIcon from '@/components/Icons/MoreDotsIcon';
import ShareIcon from '@/components/Icons/ShareIcon';
import SnippetContext from '@/context/SnippetContext';

const SnippetDeleteModal = dynamic(() => import('./SnippetDeleteModal'), {
  ssr: false
});

const menuBtnStyles: SystemStyleObject = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  h: '100%',
  _active: { color: 'primary' },
  _hover: { color: 'primary' }
};

const itemHoverBgColor = 'rgb(0, 0, 0, 0.07)';

function SnippetBarOptions() {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const user = useContext(AuthContext);
  const { slug, lang, author } = useContext(SnippetContext);

  const toast = useToast();

  const handleShareClick = useCallback(async () => {
    if (typeof navigator === 'undefined') return;

    const url = `${process.env.NEXT_PUBLIC_BASE_URL}/snippets/${lang}/${slug}/`;
    await navigator.clipboard.writeText(url);
    toast({
      description: 'Link to the snippet copied!',
      status: 'success',
      duration: 2000,
      isClosable: true,
      position: 'bottom-left',
      variant: 'subtle'
    });

    return;
  }, [lang, slug, toast]);

  return (
    <>
      <Menu isLazy placement="bottom-end">
        <MenuButton
          as={IconButton}
          aria-label="Snippet options"
          icon={<MoreDotsIcon boxSize={6} />}
          variant="unstyled"
          sx={menuBtnStyles}
        />
        <MenuList bgColor="chakra-body-bg" py={0}>
          <MenuItem
            bgColor="inherit"
            icon={<ShareIcon />}
            _hover={{ bgColor: itemHoverBgColor }}
            borderRadius="6px 6px 0 0"
            onClick={handleShareClick}
            title="Click to copy snippet's URL"
          >
            Share
          </MenuItem>
          {user?.id && user.id === author?.id && (
            <>
              <MenuItem
                bgColor="inherit"
                icon={<EditIcon />}
                _hover={{ bgColor: itemHoverBgColor }}
                isDisabled
                title="Editing is coming soon"
              >
                Edit
              </MenuItem>
              <MenuItem
                bgColor="inherit"
                icon={<DeleteIcon />}
                _hover={{ bgColor: itemHoverBgColor, color: 'red.500' }}
                onClick={onOpen}
              >
                Delete
              </MenuItem>
            </>
          )}

          <MenuItem
            bgColor="inherit"
            icon={<ExclamationIcon />}
            _hover={{ bgColor: itemHoverBgColor }}
            borderRadius="0 0 6px 6px "
            isDisabled
            title="Reporting is coming soon"
          >
            Report
          </MenuItem>
        </MenuList>
      </Menu>
      <SnippetDeleteModal isOpen={isOpen} onClose={onClose} />
    </>
  );
}

export default SnippetBarOptions;
