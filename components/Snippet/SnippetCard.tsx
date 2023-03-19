import React from 'react';
import NextLink from 'next/link';
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Divider,
  IconButton,
  Link,
  useColorModeValue,
  useToast
} from '@chakra-ui/react';

import CopyIcon from '@/components/Icons/CopyIcon';
import LangIcon from '@/components/Icons/LangIcons/LangIcon';
import SnippetBar from './SnippetBar';
import SnippetTagsList from './SnippetTagsList';
import SnippetTitle from './SnippetTitle';
import { SnippetType } from '@/services/types';
import useHovered from '@/hooks/useHovered';

interface SnippetCardProps
  extends Pick<SnippetType, 'title' | 'snippet' | 'slug' | 'lang' | 'tags'> {
  source?: string;
  mt?: number;
  mb?: number;
  children: React.ReactElement;
}

function SnippetCard({
  title,
  snippet,
  source,
  slug,
  lang,
  tags,
  mt,
  mb,
  children
}: SnippetCardProps) {
  const [hovered, handleMouseEnter, handleMouseLeave] = useHovered();

  const codeClassName = useColorModeValue('code-light', 'code-dark');

  const snippetCopiedToast = useToast();

  const handleCopyClick = async () => {
    await navigator.clipboard.writeText(source || snippet);
    snippetCopiedToast({
      description: 'Snippet copied!',
      status: 'success',
      duration: 2000,
      isClosable: true,
      position: 'bottom-left',
      variant: 'subtle'
    });

    return;
  };

  return (
    <Card
      variant="elevated"
      size="sm"
      borderRadius={10}
      mt={mt}
      mb={mb}
      h="max-content"
    >
      <CardHeader py={1.5}>
        <SnippetBar>
          <SnippetTitle title={title} slug={slug} lang={lang} />
        </SnippetBar>
      </CardHeader>
      <Divider />
      <CardBody
        as="section"
        title="Click to copy"
        onClick={handleCopyClick}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        className={codeClassName}
        cursor="pointer"
        lineHeight="5"
        position="relative"
        fontSize="codeSize"
      >
        <IconButton
          aria-label="Copy snippet"
          icon={<CopyIcon boxSize={5} focusable />}
          css={{ position: 'absolute', right: '0.1rem', top: '0.1rem' }}
          variant="ghost"
          size="sm"
        />

        {React.Children.map(children, (child: React.ReactElement) => {
          return React.cloneElement(child, { ...child.props, snippet, lang });
        })}
      </CardBody>
      <CardFooter pt={0}>
        <Link
          as={NextLink}
          href={`/snippets/${lang}`}
          aria-label={`${lang} snippets`}
          mr={2}
        >
          <LangIcon lang={lang} />
        </Link>
        <SnippetTagsList tags={tags} />
      </CardFooter>
    </Card>
  );
}

export default SnippetCard;
