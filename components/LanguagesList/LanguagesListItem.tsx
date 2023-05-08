import { useContext, useMemo } from 'react';
// import NextLink from 'next/link';
import { useRouter } from 'next/router';
import { LinkBox, LinkOverlay, ListIcon } from '@chakra-ui/react';

import { DeviceContext } from '@/context/DeviceContext';
import CenteredListItem from '@/components/Common/CenteredListItem';
import LangIcon from '@/components/Icons/LangIcons/LangIcon';
import { LangsType } from '@/services/types';
import useHovered from '@/hooks/useHovered';

interface LanguagesListItemProps {
  lang: LangsType;
  role?: React.AriaRole;
}

function LanguagesListItem({ lang, role }: LanguagesListItemProps) {
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
          role={role}
        />
        <LinkOverlay
          href={`/snippets/${escapedLang}`}
          aria-label={`Navigate to ${lang} page`}
        >
          {lang}
        </LinkOverlay>
      </CenteredListItem>
    </LinkBox>
  );
}

export default LanguagesListItem;
