import { LangsType } from './types';

export const LANGS: ReadonlyArray<LangsType> = [
  'Bash',
  'C',
  'C++',
  'C#',
  'CSS',
  'Go',
  'Haskell',
  'HTML',
  'Java',
  'JavaScript',
  'Kotlin',
  'NextJS',
  'PHP',
  'Python',
  'R',
  'React',
  'Ruby',
  'Rust',
  'SQL',
  'Swift',
  'TypeScript',
  'Other'
];

/**
 * Amount of time that the user should wait before posting new content.
 * Determined in seconds.
 */
export const POSTING_COOLDOWN_SEC = 60;

/**
 * Chakra UI breakpoints values that are used for mobile devices
 */
export const MOBILE_BREAKPOINTS: ReadonlyArray<string> = ['base', 'sm', 'md'];
