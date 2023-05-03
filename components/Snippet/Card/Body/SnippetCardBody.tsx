import React, { useCallback } from 'react';
import { CardBody, Flex, useToast } from '@chakra-ui/react';

import SnippetCopyButton from './SnippetCopyButton';
import { SnippetType } from '@/services/types';
import useHovered from '@/hooks/useHovered';

interface SnippetCardProps {
  snippet: SnippetType['snippet'];
  children: React.ReactElement;
}

function SnippetCardBody({ snippet, children }: SnippetCardProps) {
  const [hovered, handleMouseEnter, handleMouseLeave] = useHovered();
  const snippetCopiedToast = useToast();

  const handleCopyClick = useCallback(async () => {
    if (typeof navigator === 'undefined') return;

    await navigator.clipboard.writeText(snippet);
    snippetCopiedToast({
      description: 'Snippet copied!',
      status: 'success',
      duration: 2000
    });

    return;
  }, [snippet, snippetCopiedToast]);

  return (
    <CardBody
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
        {children}
        <SnippetCopyButton hovered={hovered} />
      </Flex>
    </CardBody>
  );
}

export default SnippetCardBody;
