import { useCallback, useContext } from 'react';
import dynamic from 'next/dynamic';
import NextLink from 'next/link';
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
const SnippetReportModal = dynamic(() => import('./SnippetReportModal'), {
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
  const {
    isOpen: isDeleteOpen,
    onOpen: onDeleteOpen,
    onClose: onDeleteClose
  } = useDisclosure();
  const {
    isOpen: isReportOpen,
    onOpen: onReportOpen,
    onClose: onReportClose
  } = useDisclosure();

  const user = useContext(AuthContext);
  const { id, slug, lang, author } = useContext(SnippetContext);

  const toast = useToast();

  const handleShareClick = useCallback(async () => {
    if (typeof navigator === 'undefined') return;
    if (!slug || !lang) {
      toast({
        description: 'Not possible to share',
        status: 'error',
        duration: 2000
      });
      return;
    }

    const url = `${process.env.NEXT_PUBLIC_BASE_URL}/snippets/${lang}/${slug}/`;
    await navigator.clipboard.writeText(url);
    toast({
      description: 'Link to the snippet copied!',
      status: 'success',
      duration: 2000
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
                as={NextLink}
                href={`/snippets/edit?snippetId=${id}`}
                bgColor="inherit"
                icon={<EditIcon />}
                _hover={{ bgColor: itemHoverBgColor }}
                title="Navigate to edit page"
              >
                Edit
              </MenuItem>
              <MenuItem
                bgColor="inherit"
                icon={<DeleteIcon />}
                _hover={{ bgColor: itemHoverBgColor, color: 'red.500' }}
                title="Click to open delete snippet modal"
                onClick={onDeleteOpen}
              >
                Delete
              </MenuItem>
            </>
          )}

          <MenuItem
            bgColor="inherit"
            icon={<ExclamationIcon />}
            _hover={{ bgColor: itemHoverBgColor, color: 'primary-dark' }}
            borderRadius="0 0 6px 6px "
            title="Click to open a report form"
            onClick={onReportOpen}
          >
            Report
          </MenuItem>
        </MenuList>
      </Menu>
      <SnippetDeleteModal isOpen={isDeleteOpen} onClose={onDeleteClose} />
      <SnippetReportModal isOpen={isReportOpen} onClose={onReportClose} />
    </>
  );
}

export default SnippetBarOptions;
