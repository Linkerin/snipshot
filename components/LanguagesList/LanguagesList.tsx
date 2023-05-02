import { List, ListProps } from '@chakra-ui/react';

import { LANGS } from '@/services/constants';
import LanguagesListItem from './LanguagesListItem';

function LanguagesList(props: ListProps) {
  return (
    <List
      display="flex"
      flexDirection="column"
      alignItems="flex-start"
      {...props}
    >
      {LANGS.map(lang => {
        return <LanguagesListItem key={lang} lang={lang} role={props.role} />;
      })}
    </List>
  );
}

export default LanguagesList;
