import { createElement } from 'react';
import { toH } from 'hast-to-hyperscript';

import { SnippetType } from '@/services/types';
import createSnippetTree from '@/services/snippets';

interface SnippetCodeProps {
  snippet: SnippetType['snippet'];
  lang: SnippetType['lang'];
}

function SnippetCodeRawText({ snippet, lang }: SnippetCodeProps) {
  if (!snippet) return null;

  const tree = createSnippetTree(snippet, lang);

  const codeElement = toH(createElement, tree);

  return createElement(
    'code',
    { style: { whiteSpace: 'pre-wrap', maxWidth: '64ch' } },
    codeElement
  );
}

export default SnippetCodeRawText;
