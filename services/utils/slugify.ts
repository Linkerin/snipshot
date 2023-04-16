/**
 * String slugify function
 * @param value A target string to slugify
 * @returns Slugified string
 * @example slugify('Factorial code snippet') // 'factorial-code-snippet'
 */
function slugify(value: string): string {
  return value
    .toString()
    .normalize('NFD') // split an accented letter in the base letter and the accent
    .replace(/[\u0300-\u036f]/g, '') // remove all previously split accents
    .toLowerCase()
    .replace(/[^a-z0-9 -]/g, '') // remove all chars not letters, numbers and spaces (to be replaced)
    .trim()
    .replace(/\s+/g, '-');
}

export default slugify;
