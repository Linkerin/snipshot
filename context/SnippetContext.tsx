import { createContext } from 'react';

import { SnippetType } from '@/services/types';

export const snippetContextValueDefault = {
  id: '',
  title: '',
  snippet: '',
  tree: '',
  lang: undefined,
  verified: false,
  author: {
    id: '',
    name: ''
  },
  created: '',
  rating: {
    id: '',
    rating: 0
  }
};
const SnippetContext = createContext<SnippetType>(snippetContextValueDefault);

export default SnippetContext;
