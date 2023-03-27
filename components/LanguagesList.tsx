import { MouseEventHandler, useContext } from 'react';
import NextLink from 'next/link';
import { useRouter } from 'next/router';
import { LinkBox, LinkOverlay, List, ListIcon } from '@chakra-ui/react';

import CenteredListItem from './CenteredListItem';
import { DeviceContext } from '@/context/DeviceContext';
import LangIcon from '@/components/Icons/LangIcons/LangIcon';
import { LANGS } from '@/services/constants';

interface LanguagesListProps {
  noLinks?: boolean;
  handleItemClick?: MouseEventHandler;
}

function LanguagesList({
  noLinks = false,
  handleItemClick
}: LanguagesListProps) {
  const router = useRouter();
  const { isMobile } = useContext(DeviceContext);

  return noLinks ? (
    <List
      spacing={3}
      display="flex"
      flexDirection="column"
      alignItems="flex-start"
    >
      {LANGS.map(lang => {
        if (lang)
          return (
            <CenteredListItem
              key={lang}
              id={`lang-list-${lang.toLowerCase()}`}
              textAlign="center"
              onClick={handleItemClick}
              data-value={lang}
            >
              <ListIcon boxSize={6}>
                <LangIcon
                  lang={lang}
                  disabled={
                    router.query.lang === lang || isMobile ? false : true
                  }
                />
              </ListIcon>
              {lang}
            </CenteredListItem>
          );
      })}
    </List>
  ) : (
    <List
      spacing={3}
      display="flex"
      flexDirection="column"
      alignItems="flex-start"
    >
      {LANGS.map(lang => {
        if (lang)
          return (
            <LinkBox key={lang} w="100%">
              <CenteredListItem
                id={`lang-list-${lang.toLowerCase()}`}
                aria-label={`${lang} Page`}
                textAlign="center"
                onClick={handleItemClick}
                data-value={lang}
              >
                <ListIcon boxSize={6}>
                  <LangIcon
                    lang={lang}
                    disabled={
                      router.query.lang === lang || isMobile ? false : true
                    }
                  />
                </ListIcon>
                <LinkOverlay
                  as={NextLink}
                  href={`/snippets/${lang}`}
                  prefetch={false}
                >
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
