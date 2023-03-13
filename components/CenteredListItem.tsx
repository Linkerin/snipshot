import React from 'react';
import { ListItem, ListItemProps } from '@chakra-ui/react';

function CenteredListItem(props: ListItemProps) {
  return (
    <ListItem
      css={{
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start',
        width: '100%'
      }}
      {...props}
    >
      {props.children}
    </ListItem>
  );
}

export default CenteredListItem;
