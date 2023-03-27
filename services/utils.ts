/**
 * Checks whether the provided character belongs to ASCII characters or not
 * @param char Single `string` character
 * @returns `true` if the character belongs to ASCII, `false` otherwise
 */
export function isAscii(char: string): boolean {
  if (!char || char.length !== 1) return false;

  const charCode = char.charCodeAt(0);
  if (20 <= charCode && charCode <= 127) return true;

  return false;
}

/**
 * Checks that the provided string is a possibly valid e-mail address.
 * Address name and second level domain may contain lowercase letters and numbers,
 * first level domain should contain from 2 to 4 letter symbols.
 */
export function isValidEmail(email: string): boolean {
  let emailRegex = new RegExp('[a-z0-9]+@[a-z0-9]+.[a-z]{2,4}$');

  return emailRegex.test(email.toLowerCase());
}

/**
 * String slugify function
 * @param value A target string to slugify
 * @returns Slugified string
 * @example slugify('Factorial code snippet') // 'factorial-code-snippet'
 */
export function slugify(value: string): string {
  return value
    .toString()
    .normalize('NFD') // split an accented letter in the base letter and the accent
    .replace(/[\u0300-\u036f]/g, '') // remove all previously split accents
    .toLowerCase()
    .replace(/[^a-z0-9 -]/g, '') // remove all chars not letters, numbers and spaces (to be replaced)
    .trim()
    .replace(/\s+/g, '-');
}

/**
 * Creates a random string using Math.random() method and Date.now().
 * @returns Random string
 * @example randomString(); // 'a35cb487380'
 */
export function randomString(): string {
  return (
    Math.random().toString(16).slice(2, 7) + Date.now().toString().slice(7)
  );
}

/**
 * Get starting index and last index for Supabase
 * pagination function [`range()`](https://supabase.com/docs/reference/javascript/range)
 * @param page Page number presented as a string
 * @returns An object of two numeric values: startIndex and lastIndex
 */
export function getPaginationLimits(page: string | string[] | undefined) {
  let itemsPerPage = 10;
  // Check that PAGINATION environment variable parses to a valid number
  if (
    process.env.NEXT_PUBLIC_PAGINATION &&
    !isNaN(+process.env.NEXT_PUBLIC_PAGINATION)
  ) {
    itemsPerPage = +process.env.NEXT_PUBLIC_PAGINATION;
  }

  let startIndex: number = 0;
  // Check that provided `page` value parses to a valid number
  if (page && !isNaN(+page)) startIndex = (+page - 1) * itemsPerPage;
  const lastIndex = startIndex + itemsPerPage - 1;

  return { startIndex, lastIndex };
}

/**
 * Cleans data type to avoid NextJS [serializing error](https://github.com/vercel/next.js/issues/11993)
 * @param data Any `object`
 * @returns copy of `data` object with proper types
 */
export function cleanObjDataTypesForNextJS(data: any) {
  for (let [key, item] of Object.entries(data)) {
    if (item === null) continue;

    if (typeof item === 'bigint') {
      data[key] = Number(item);
      continue;
    }

    // Check for a Date object
    if (item instanceof Date && typeof item.getDate === 'function') {
      data[key] = JSON.parse(JSON.stringify(item));
      continue;
    }

    if (Array.isArray(item) || typeof item === 'object') {
      data[key] = cleanObjDataTypesForNextJS(item);
      continue;
    }
  }

  return data;
}

/**
 * CSS properties that hide scroll bar for different browsers.
 */
export const hideScrollbarCss = {
  scrollbarWidth: 'none', // Firefox
  '&::-webkit-scrollbar': {
    display: 'none' // Chrome
  }
};
