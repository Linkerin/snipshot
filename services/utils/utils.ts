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
