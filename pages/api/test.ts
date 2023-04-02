import type { NextApiRequest, NextApiResponse } from 'next';

import redis from '@/services/redis';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // console.log(req.socket.remoteAddress);
  const ipAddress = req.socket.remoteAddress;

  if (!ipAddress) {
    return res.status(400).json({ message: 'Bad Request' });
  }

  const value = await redis.get<number>(ipAddress);
  console.log(value);
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
