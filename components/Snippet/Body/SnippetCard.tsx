import React, { useCallback, useContext } from 'react';
import NextLink from 'next/link';
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Divider,
  Flex,
  IconButton,
  useColorModeValue,
  useToast
} from '@chakra-ui/react';

import CopyIcon from '@/components/Icons/CopyIcon';
import LangIcon from '@/components/Icons/LangIcons/LangIcon';
import SnippetBar from '../Header/SnippetBar';
import SnippetContext from '@/context/SnippetContext';
import SnippetTagsList from './SnippetTagsList';
import SnippetTitle from '../Header/SnippetTitle';
import { SnippetType } from '@/services/types';
import useHovered from '@/hooks/useHovered';

interface SnippetCardProps {
  snippet: SnippetType['snippet'];
  source?: string;
  mt?: number;
  mb?: number;
  children: React.ReactElement;
}

function SnippetCard({ snippet, source, mt, mb, children }: SnippetCardProps) {
  const { lang, tags } = useContext(SnippetContext);

  const [hovered, handleMouseEnter, handleMouseLeave] = useHovered();

  const headingDividerColor = useColorModeValue('gray.300', 'chakra-body-bg');
  const copyIconColor = useColorModeValue('text-secondary', 'custom-white');
  const copyIconHoverBgColor = useColorModeValue(
    'blackAlpha.50',
    'whiteAlpha.200'
  );

  const snippetCopiedToast = useToast();

  let escapedLang: string | undefined = lang;
  if (lang) {
    escapedLang = encodeURIComponent(lang);
  }

  const handleCopyClick = useCallback(async () => {
    if (typeof navigator === 'undefined') return;

    await navigator.clipboard.writeText(source || snippet);
    snippetCopiedToast({
      description: 'Snippet copied!',
      status: 'success',
      duration: 2000
    });

    return;
  }, [snippet, source, snippetCopiedToast]);

  return (
    <Card
      variant="elevated"
      size="sm"
      borderRadius={10}
      mt={mt}
      mb={mb}
      h="max-content"
    >
      <CardHeader py={1.5} pr={1}>
        <SnippetBar>
          <SnippetTitle />
        </SnippetBar>
      </CardHeader>
      <Divider color={headingDividerColor} />
      <CardBody
        as="section"
        title="Click to copy"
        onClick={handleCopyClick}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        cursor="pointer"
        lineHeight="5"
        position="relative"
        fontSize="codeSize"
        pr={1}
      >
        <Flex justifyContent="space-between">
          {React.Children.map(children, (child: React.ReactElement) => {
            return React.cloneElement(child, { ...child.props, snippet, lang });
          })}
          <IconButton
            aria-label="Copy snippet"
            icon={
              <CopyIcon
                boxSize={5}
                color={hovered ? 'primary' : copyIconColor}
                focusable
              />
            }
            bg={hovered ? copyIconHoverBgColor : undefined}
            top="-2"
            variant="ghost"
            size="sm"
          />
        </Flex>
      </CardBody>
      <CardFooter pt={0}>
        <IconButton
          as={NextLink}
          href={`/snippets/${escapedLang}`}
          prefetch={false}
          aria-label={`${lang} snippets`}
          icon={<LangIcon lang={lang} focusable />}
          variant="ghost"
          size="sm"
          mr={2}
          colorScheme="none"
        />
        <SnippetTagsList tags={tags} />
      </CardFooter>
    </Card>
  );
}

export default SnippetCard;
