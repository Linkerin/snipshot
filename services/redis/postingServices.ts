import type { NextApiRequest } from 'next';

import { POSTING_COOLDOWN_SEC } from '../constants';
import redis from './redis';

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
