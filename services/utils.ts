import type { NextApiRequest } from 'next';

import { POSTING_COOLDOWN_SEC } from './constants';
import redis from './redis';

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
 * Gets real IP address from request (using Vercel headers)
 * @param req Request object
 * @returns Request's real IP address string or an empty string
 * @example
 * const ipAddress = ipAddressFromReq(req);
 */
export function ipAddressFromReq(req: NextApiRequest) {
  let ipAddress = req.headers['x-real-ip'] as string;
  const forwardedFor = req.headers['x-forwarded-for'] as string;
  if (!ipAddress && forwardedFor) {
    ipAddress = forwardedFor?.split(',')[0] ?? '';
  }

  return ipAddress;
}

interface IsPostingAllowedParams {
  req: NextApiRequest;
  userId?: string;
}
/**
 * Checks whether it's allowed to post new content according to cooldown setting.
 * @param req Request object
 * @param userId User ID (optional)
 * @example
 * const postingCheck = await isPostingAllowed({ req, userId });
 */
export async function isPostingAllowed({
  req,
  userId
}: IsPostingAllowedParams) {
  let redisKey: string;

  if (userId) {
    redisKey = userId;
  } else {
    const ipAddress = ipAddressFromReq(req);
    if (!ipAddress) {
      return { allowed: false, message: 'IP address was not determined' };
    }

    redisKey = ipAddress;
  }
  const redisTimestamp = await redis.get<number>(redisKey);

  if (redisTimestamp) {
    const timePassedSec = (Date.now() - redisTimestamp) / 1000;

    if (timePassedSec < POSTING_COOLDOWN_SEC) {
      const timeLeft = POSTING_COOLDOWN_SEC - Math.floor(timePassedSec);

      return {
        allowed: false,
        message: `You can't post anything for about ${timeLeft} seconds`
      };
    }

    return { allowed: true, message: 'Posting allowed' };
  }

  await redis.set(redisKey, Date.now());
  await redis.expire(redisKey, POSTING_COOLDOWN_SEC);

  return { allowed: true, message: 'Posting allowed' };
}

/**
 * Fetch `/api/is-posting-allowed` route
 * @param userId userId (optional)
 * @returns An object with two keys: `allowed` and `message`
 * @example
 * const postingPermission = await fetchIsPostingAllowed(userId);
 */
export async function fetchIsPostingAllowed(userId?: string) {
  let url = '/api/is-posting-allowed';
  if (userId) {
    url += `?userId=${userId}`;
  }

  const res = await fetch(url);
  if (!res.ok) {
    const error = await res.json();
    throw error;
  }

  const postingPermission = await res.json();

  return postingPermission as { allowed: boolean; message: string };
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
