import React from 'react';
import { ListItem, ListItemProps } from '@chakra-ui/react';

interface CenteredListItemProps extends ListItemProps {
  children: React.ReactElement | string | (string | React.ReactElement)[];
}

function CenteredListItem(props: CenteredListItemProps) {
  return (
    <ListItem
      css={{
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center'
      }}
      {...props}
    >
      {props.children}
    </ListItem>
  );
}

export default CenteredListItem;
