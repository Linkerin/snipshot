import React from 'react';
import {
  ListItem,
  ListItemProps,
  HTMLChakraProps,
  useColorModeValue
} from '@chakra-ui/react';

interface CenteredListItemProps extends ListItemProps {
  variant?: 'selectable';
}

function CenteredListItem({
  children,
  variant,
  ...props
}: CenteredListItemProps) {
  const baseStyles: HTMLChakraProps<'li'> = {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    width: '100%'
  };

  const selectableStyles: HTMLChakraProps<'li'> = {
    cursor: 'pointer',
    tabIndex: 0,
    p: 3,
    _hover: { bgColor: useColorModeValue('blackAlpha.50', 'whiteAlpha.100') },
    _active: { bgColor: useColorModeValue('blackAlpha.200', 'whiteAlpha.300') }
  };

  const styles =
    variant === 'selectable'
      ? { ...baseStyles, ...selectableStyles }
      : baseStyles;

  return (
    <ListItem sx={styles} {...props}>
      {children}
    </ListItem>
  );
}

export default CenteredListItem;
