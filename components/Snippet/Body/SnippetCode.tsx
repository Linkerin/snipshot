import { createElement } from 'react';
import { toH } from 'hast-to-hyperscript';

import { LangsType } from '@/services/types';
import createSnippetTree from '@/services/snippets';

interface SnippetCodeProps {
  snippet?: string;
  lang?: LangsType;
  snippetTree?: boolean;
}

function SnippetCode({ snippet, lang, snippetTree = false }: SnippetCodeProps) {
  if (!snippet) return null;

  let tree;

  snippetTree
    ? (tree = JSON.parse(snippet))
    : (tree = createSnippetTree(snippet, lang));

  const codeElement = toH(createElement, tree);

  return createElement(
    'code',
    { style: { whiteSpace: 'pre-wrap' } },
    codeElement
  );
}

export default SnippetCode;
