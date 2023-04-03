import { FocusEvent } from 'react';
// import { Rating, Snippet, User } from '@prisma/client';

/**
 * Possible language values
 */
export type LangsType =
  | 'Bash'
  | 'C'
  | 'C++'
  | 'C#'
  | 'CSS'
  | 'Go'
  | 'Haskell'
  | 'HTML'
  | 'Java'
  | 'JavaScript'
  | 'Kotlin'
  | 'NextJS'
  | 'PHP'
  | 'Python'
  | 'R'
  | 'React'
  | 'Ruby'
  | 'Rust'
  | 'SQL'
  | 'Swift'
  | 'TypeScript'
  | 'Other'
  | ''
  | typeof undefined;

// export type LangsType = keyof LangIconsType | '' | typeof undefined;

export interface TagType {
  tag: string;
}

/**
 * Snippet data model
 */
export interface SnippetType {
  id: string;
  title: string;
  snippet: string;
  tree: string;
  lang: LangsType;
  slug?: string;
  verified: boolean;
  author: {
    name: string;
  };
  created: string;
  rating: {
    id: string;
    rating: number;
  };
  tags?: string[];
}
// export interface SnippetType
//   extends Omit<Snippet, 'updated' | 'userId' | 'lang' | 'slug'> {
//   slug?: Pick<Snippet, 'slug'>;
//   lang: LangsType;
//   rating: Pick<Rating, 'id' | 'rating'>;
//   author: Pick<User, 'name'>;
// }

/**
 * Brief information about a snippet
 */
export interface SnippetInfo {
  slug: string;
  title: string;
  lang: LangsType;
}

/**
 * onBlur / onFocus handler function type for SearchBar component.
 */
export type SearchFocusHandler = (
  focused: boolean,
  e?: FocusEvent<HTMLInputElement | HTMLTextAreaElement, Element>
) => void;

/**
 * Comment data type
 */
export interface CommentType {
  id: string;
  comment: string;
  parent?: string | null;
  snippetId: string;
  created: string;
  updated?: string;
  deleted: boolean;
  author: {
    id: string;
    name: string;
    avatar: string;
  };
}
