import { createElement } from 'react';
import { toH } from 'hast-to-hyperscript';

import { SnippetType } from '@/services/types';

function SnippetCode({ snippetTree }: { snippetTree: SnippetType['tree'] }) {
  if (!snippetTree) return null;

  const tree = JSON.parse(snippetTree);

  const codeElement = toH(createElement, tree);

  return createElement(
    'code',
    { style: { whiteSpace: 'pre-wrap', maxWidth: '64ch' } },
    codeElement
  );
}

export default SnippetCode;
