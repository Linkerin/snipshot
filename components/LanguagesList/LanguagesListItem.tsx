import { useContext, useMemo } from 'react';
import NextLink from 'next/link';
import { useRouter } from 'next/router';
import { LinkBox, LinkOverlay, ListIcon } from '@chakra-ui/react';

import { DeviceContext } from '@/context/DeviceContext';
import CenteredListItem from '@/components/Common/CenteredListItem';
import LangIcon from '@/components/Icons/LangIcons/LangIcon';
import { LangsType } from '@/services/types';
import useHovered from '@/hooks/useHovered';

function LanguagesListItem({ lang }: { lang: LangsType }) {
  const router = useRouter();
  const { isMobile } = useContext(DeviceContext);
  const [hovered, handleMouseEnter, handleMouseLeave] = useHovered();

  let escapedLang: LangsType | string = useMemo(
    () => (lang ? encodeURIComponent(lang) : ''),
    [lang]
  );

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
        />
        <LinkOverlay
          as={NextLink}
          aria-label={`To ${lang} language page`}
          href={`/snippets/${escapedLang}`}
          prefetch={false}
        >
          {lang}
        </LinkOverlay>
      </CenteredListItem>
    </LinkBox>
  );
}

export default LanguagesListItem;
