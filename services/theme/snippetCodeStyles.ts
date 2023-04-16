import { mode } from '@chakra-ui/theme-tools';
import type { StyleFunctionProps } from '@chakra-ui/styled-system';

function snippetCodeStyles(props: StyleFunctionProps) {
  const styles = {
    '.code-line-number': {
      color: '#8b949e'
    },
    code: {
      color: mode('#66accc', '#e06c75')(props)
    },
    '.hljs': {
      color: '#abb2bf',
      backgroundColor: '#282c34'
    },
    '.hljs-doctag, .hljs-keyword, .hljs-meta, .hljs-keyword, .hljs-template-tag, .hljs-template-variable, .hljs-type, .hljs-variable.language_':
      {
        color: mode('#ab47bc', '#c678dd')(props)
      },
    '.hljs-title, .hljs-title.class_, .hljs-title.class_.inherited__, .hljs-title.function_':
      {
        color: mode('#2979ff', '#61afef')(props)
      },
    '.hljs-class': {
      color: mode('#ffa000', '#e5c07b')(props)
    },
    '.hljs-attr, .hljs-attribute, .hljs-literal, .hljs-meta, .hljs-operator, .hljs-selector-attr, .hljs-selector-class, .hljs-selector-id, .hljs-variable':
      {
        color: '#d19a66'
      },
    '.hljs-number, .hljs-params': {
      color: mode('#ff7042', '#d19a66')(props)
    },
    '.hljs-meta, .hljs-regexp': {
      color: mode('#80cbc4', '#a5d6ff')(props)
    },
    '.hljs-string': {
      color: mode('#7cb342', '#98c379')(props)
    },
    '.hljs-built_in, .hljs-symbol': {
      color: mode('#5c6bc0', '#61aeee')(props)
    },
    '.hljs-code, .hljs-comment, .hljs-formula': {
      color: '#8b949e',
      fontStyle: 'italic'
    },
    '.hljs-name, .hljs-quote, .hljs-selector-pseudo, .hljs-selector-tag': {
      color: '#e06c75'
    },
    '.hljs-subst': {
      color: '#c9d1d9'
    },
    '.hljs-section': {
      color: '#1f6feb',
      fontWeight: 700
    },
    '.hljs-bullet': {
      color: '#f2cc60'
    },
    '.hljs-emphasis': {
      color: '#c9d1d9',
      fontStyle: 'italic'
    },
    '.hljs-strong': {
      color: '#c9d1d9',
      fontWeight: 700
    },
    '.hljs-addition': {
      color: '#aff5b4',
      backgroundColor: '#033a16'
    },
    '.hljs-deletion': {
      color: '#ffdcd7',
      backgroundColor: '#67060c'
    },
    '.hljs-link': {
      textDecoration: 'underline'
    }
  };
  return styles;
}

export default snippetCodeStyles;
