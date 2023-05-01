import { useContext } from 'react';
import type { AriaRole } from 'react';
import NextLink from 'next/link';
import { useRouter } from 'next/router';
import {
  LinkBox,
  LinkOverlay,
  List,
  ListIcon,
  ListProps
} from '@chakra-ui/react';

import CenteredListItem from './Common/CenteredListItem';
import { DeviceContext } from '@/context/DeviceContext';
import LangIcon from '@/components/Icons/LangIcons/LangIcon';
import { LANGS } from '@/services/constants';
import { LangsType } from '@/services/types';
import useHovered from '@/hooks/useHovered';

function LanguagesListItem({
  lang,
  role
}: {
  lang: LangsType;
  role?: AriaRole;
}) {
  const router = useRouter();
  const { isMobile } = useContext(DeviceContext);
  const [hovered, handleMouseEnter, handleMouseLeave] = useHovered();

  let escapedLang: LangsType | string = lang;
  if (lang) {
    escapedLang = encodeURIComponent(lang);
  }

  return (
    <LinkBox w="100%">
      <CenteredListItem
        id={`lang-list-${lang?.toLowerCase()}`}
        aria-label={`${lang} Page`}
        textAlign="center"
        data-value={lang}
        variant="selectable"
        color={hovered ? 'primary' : undefined}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <ListIcon
          as={LangIcon}
          boxSize={6}
          lang={lang}
          disabled={
            router.query.lang === lang || isMobile || hovered ? false : true
          }
          role={role}
        />
        <LinkOverlay
          as={NextLink}
          href={`/snippets/${escapedLang}`}
          prefetch={false}
          aria-label={`Navigate to ${lang} page`}
        >
          {lang}
        </LinkOverlay>
      </CenteredListItem>
    </LinkBox>
  );
}

function LanguagesList(props: ListProps) {
  return (
    <List
      display="flex"
      flexDirection="column"
      alignItems="flex-start"
      {...props}
    >
      {LANGS.map(lang => {
        if (lang)
          return <LanguagesListItem key={lang} lang={lang} role={props.role} />;
      })}
    </List>
  );
}

export default LanguagesList;
