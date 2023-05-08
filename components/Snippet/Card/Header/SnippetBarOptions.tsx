import { useCallback, useContext } from 'react';
import dynamic from 'next/dynamic';
import {
  IconButton,
  Link,
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
import { SnippetRemoveHandlerType, SnippetType } from '@/services/types';

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

interface SnippetBarOptionsProps {
  snippetId: SnippetType['id'];
  authorId?: string;
  lang: SnippetType['lang'];
  slug: SnippetType['slug'];
  handleSnippetRemove?: SnippetRemoveHandlerType;
}

function SnippetBarOptions({
  snippetId,
  authorId,
  lang,
  slug,
  handleSnippetRemove
}: SnippetBarOptionsProps) {
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

  const [user] = useContext(AuthContext);

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
          {user?.id && user.id === authorId && (
            <>
              <MenuItem
                as={Link}
                href={`/snippets/edit?snippetId=${snippetId}`}
                aria-label="Edit snippet page"
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
      {isDeleteOpen && (
        <SnippetDeleteModal
          isOpen={isDeleteOpen}
          onClose={onDeleteClose}
          snippetId={snippetId}
          authorId={authorId}
          handleSnippetRemove={handleSnippetRemove}
        />
      )}
      {isReportOpen && (
        <SnippetReportModal
          isOpen={isReportOpen}
          onClose={onReportClose}
          snippetId={snippetId}
        />
      )}
    </>
  );
}

export default SnippetBarOptions;
