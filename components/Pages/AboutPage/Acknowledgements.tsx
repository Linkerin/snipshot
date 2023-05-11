import Image from 'next/image';
import NextLink from 'next/link';
import {
  Flex,
  Link,
  ListItem,
  UnorderedList,
  useColorModeValue
} from '@chakra-ui/react';

import ChakraLogoLight from '@/public/images/about-page/ChakraLogoLight.webp';
import ChakraLogoDark from '@/public/images/about-page/ChakraLogoDark.webp';
import FreepikLogoLight from '@/public/images/about-page/FreepikLogoLight.svg';
import FreepikLogoDark from '@/public/images/about-page/FreepikLogoDark.svg';
import IconScoutLogoLight from '@/public/images/about-page/IconScoutLogoLight.svg';
import IconScoutLogoDark from '@/public/images/about-page/IconScoutLogoDark.svg';
import NextJSLogoLight from '@/public/images/about-page/NextJSLogoLight.svg';
import NextJSLogoDark from '@/public/images/about-page/NextJSLogoDark.svg';
import ReactLogoLight from '@/public/images/about-page/ReactLogoLight.svg';
import ReactLogoDark from '@/public/images/about-page/ReactLogoDark.svg';
import OtherLangIcon from '@/components/Icons/LangIcons/OtherLangIcon';
import SupabaseLogoLight from '@/public/images/about-page/SupabaseLogoLight.svg';
import SupabaseLogoDark from '@/public/images/about-page/SupabaseLogoDark.svg';
import VercelLogoLight from '@/public/images/about-page/VercelLogoLight.svg';
import VercelLogoDark from '@/public/images/about-page/VercelLogoDark.svg';

function Acknowledgements() {
  const chakraLogo = useColorModeValue(ChakraLogoLight, ChakraLogoDark);
  const freepikLogo = useColorModeValue(FreepikLogoLight, FreepikLogoDark);
  const iconScoutLogo = useColorModeValue(
    IconScoutLogoLight,
    IconScoutLogoDark
  );
  const nextLogo = useColorModeValue(NextJSLogoLight, NextJSLogoDark);
  const reactLogo = useColorModeValue(ReactLogoLight, ReactLogoDark);
  const supabaseLogo = useColorModeValue(SupabaseLogoLight, SupabaseLogoDark);
  const vercelLogo = useColorModeValue(VercelLogoLight, VercelLogoDark);

  return (
    <Flex
      as={UnorderedList}
      flexDirection="row"
      alignItems="flex-start"
      justifyContent="center"
      gap={10}
      flexWrap="wrap"
      my={10}
      mx={0}
    >
      <ListItem listStyleType="none">
        <Link
          as={NextLink}
          aria-label="Navigate to external React.dev page"
          href="https://react.dev"
          prefetch={false}
          rel="noreferrer"
          isExternal
        >
          <Image src={reactLogo} alt="React Logo" height={50} />
        </Link>
      </ListItem>
      <ListItem listStyleType="none">
        <Link
          as={NextLink}
          aria-label="Navigate to external NextJS.org page"
          href="https://nextjs.org"
          prefetch={false}
          rel="noreferrer"
          isExternal
        >
          <Image src={nextLogo} alt="NextJS Logo" height={50} />
        </Link>
      </ListItem>
      <ListItem listStyleType="none">
        <Link
          as={NextLink}
          aria-label="Navigate to external Vercel.com page"
          href="https://vercel.com"
          prefetch={false}
          rel="noreferrer"
          isExternal
        >
          <Image src={vercelLogo} alt="Vercel Logo" height={45} />
        </Link>
      </ListItem>
      <ListItem listStyleType="none">
        <Link
          as={NextLink}
          aria-label="Navigate to external Supabase.com page"
          href="https://supabase.com"
          prefetch={false}
          rel="noreferrer"
          isExternal
        >
          <Image src={supabaseLogo} alt="Supabase Logo" height={45} />
        </Link>
      </ListItem>
      <ListItem listStyleType="none">
        <Link
          as={NextLink}
          aria-label="Navigate to external Chakra-UI.com page"
          href="https://chakra-ui.com"
          prefetch={false}
          rel="noreferrer"
          isExternal
        >
          <Image src={chakraLogo} alt="Chakra UI Logo" height={50} />
        </Link>
      </ListItem>
      <ListItem listStyleType="none">
        <Link
          as={NextLink}
          aria-label="Navigate to external IconScout.com page"
          href="https://iconscout.com/"
          prefetch={false}
          rel="noreferrer"
          isExternal
        >
          <Image src={iconScoutLogo} alt="IconScout Logo" height={50} />
        </Link>
      </ListItem>
      <ListItem listStyleType="none">
        <Link
          as={NextLink}
          aria-label="Navigate to external DevIcon.dev page"
          href="https://devicon.dev"
          prefetch={false}
          rel="noreferrer"
          fontWeight="bold"
          fontSize="2xl"
          isExternal
        >
          <OtherLangIcon mr={2} boxSize="50px" />
          Devicon
        </Link>
      </ListItem>
      <ListItem listStyleType="none">
        <Link
          as={NextLink}
          aria-label="Navigate to external catalyststuff profile page on Freepik.com"
          href="https://www.freepik.com/author/catalyststuff"
          prefetch={false}
          rel="noreferrer"
          isExternal
        >
          <Image src={freepikLogo} alt="Freepik Logo" height={50} />
        </Link>
      </ListItem>
    </Flex>
  );
}

export default Acknowledgements;
