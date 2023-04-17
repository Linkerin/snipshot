import type { NextApiRequest } from 'next';

import { POSTING_COOLDOWN_SEC } from '@/services/constants';
import { Ratelimit } from '@upstash/ratelimit';
import redis from '@/services/redis/redis';

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

  const ratelimit = new Ratelimit({
    redis,
    limiter: Ratelimit.slidingWindow(2, `${POSTING_COOLDOWN_SEC} s`),
    analytics: true
  });
  const { success, reset } = await ratelimit.limit(redisKey);

  if (!success) {
    const timeLeft = Math.floor((reset - Date.now()) / 1000);
    return {
      allowed: false,
      message: `You can't post anything for about ${timeLeft} seconds`
    };
  }

  return { allowed: true, message: 'Posting allowed' };
}
