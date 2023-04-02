import type { NextApiRequest, NextApiResponse } from 'next';

import redis from '@/services/redis';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // Getting user's original IP address
  let ipAddress = req.headers['x-real-ip'] as string;
  const forwardedFor = req.headers['x-forwarded-for'] as string;
  if (!ipAddress && forwardedFor) {
    ipAddress = forwardedFor?.split(',')[0] ?? '';
  }

  if (!ipAddress) {
    return res.status(400).json({ message: 'Bad Request' });
  }

  const value = await redis.get<number>(ipAddress);

  if (!value) {
    await redis.set(ipAddress, Date.now());
    redis.expire(ipAddress, 60);
    return res.status(200).send('SET');
  }

  if (Date.now() - value < 60000) {
    return res.status(200).send('too fast');
  }

  await redis.set(ipAddress, Date.now());

  res.status(200).send('OK');
}
