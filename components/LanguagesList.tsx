import { useContext } from 'react';
import NextLink from 'next/link';
import { useRouter } from 'next/router';
import {
  LinkBox,
  LinkOverlay,
  List,
  ListIcon,
  ListItem
} from '@chakra-ui/react';

import CenteredListItem from './CenteredListItem';
import LangIcon from '@/components/Icons/LangIcons/LangIcon';
import { LANGS } from '@/services/constants';

// import { DeviceContext } from '../context/DeviceContext';

function LanguagesList() {
  const router = useRouter();

  //   const { isMobile } = useContext(DeviceContext);

  return (
    <List
      spacing={3}
      display="flex"
      flexDirection="column"
      alignItems="flex-start"
    >
      {LANGS.map(lang => {
        if (lang)
          return (
            <LinkBox key={lang}>
              <CenteredListItem
                id={`lang-list-${lang.toLowerCase()}`}
                aria-label={`${lang} Page`}
                textAlign="center"
              >
                <ListIcon boxSize={6}>
                  <LangIcon
                    lang={lang}
                    disabled={
                      router.query.lang === lang // || isMobile ? false : true
                    }
                  />
                </ListIcon>
                <LinkOverlay as={NextLink} href={`/snippets/${lang}`}>
                  {lang}
                </LinkOverlay>
              </CenteredListItem>
            </LinkBox>
          );
      })}
    </List>
  );
}

export default LanguagesList;
